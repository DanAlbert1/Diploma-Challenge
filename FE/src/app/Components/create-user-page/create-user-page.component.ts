import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss']
})
export class CreateUserPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public api:ApiService
  ) { }

  passwordValidation = {
    errorMessage:""
  }

  checkError = (formControl: any) => {
    let isError = formControl.errors != null ? true : false

    return isError;
  }

  createUserForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/\d/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    confirmPassword:['',[Validators.required, Validators.minLength(7)]]
  })




  ngOnInit(): void {
  }

  createUser = () => {

    this.createUserForm.markAllAsTouched();
    if (this.createUserForm.controls['password'].value != this.createUserForm.controls['confirmPassword'].value) {
      this.createUserForm.controls['password'].setErrors({ 'incorrect': true })
      this.createUserForm.controls['confirmPassword'].setErrors({ 'incorrect': true })

      this.passwordValidation.errorMessage = "Passwords don't match."

    } else if (!this.createUserForm.valid) {
      let password = this.createUserForm.controls['password'].value

      let hasUpperCase = /[A-Z]/.test(password);
      let hasLowerCase = /[a-z]/.test(password);
      let hasNumbers = /\d/.test(password);

      if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
        this.passwordValidation.errorMessage = "Password requires Lower case (a-z), upper case (A-Z) and numbers (0-9)"
        this.createUserForm.controls['password'].setErrors({ 'incorrect': true })
        this.createUserForm.controls['confirmPassword'].setErrors({ 'incorrect': true })

      } else {

        this.createUserForm.controls['password'].setErrors(null)
        this.createUserForm.controls['confirmPassword'].setErrors(null)
        this.passwordValidation.errorMessage = ""
      }

    } else {

      this.createUserForm.controls['password'].setErrors(null)
      this.createUserForm.controls['confirmPassword'].setErrors(null)
      this.passwordValidation.errorMessage = ""

      let createUserReq = {
        firstName: this.createUserForm.controls['firstName'].value.trim(),
        lastName: this.createUserForm.controls['lastName'].value.trim(),
        phoneNumber: this.createUserForm.controls['phoneNumber'].value.trim(),
        email: this.createUserForm.controls['email'].value.trim(),
        password: this.createUserForm.controls['password'].value,
      }

      this.api.signUp(createUserReq).subscribe({
        next: (resp) => { console.log(resp) },
        error: (err) => { alert(err) },
        complete: () => {
          this.createUserForm.reset();
          alert('User created')
        }
      })
    }
  }

}
