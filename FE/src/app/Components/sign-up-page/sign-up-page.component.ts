import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public api: ApiService
  ) { }

    passwordValidation = {
      errorMessage:""
    }

  checkError = (formControl: any) => {
    let isError = formControl.errors != null ? true : false

    return isError;
  }

  signUpForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/\d/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    confirmPassword:['',[Validators.required, Validators.minLength(7)]]
  })

  ngOnInit(): void {
  }

  login = () => {
    this.auth.loginWithRedirect({ appState:{target:'/pets'} })
  }

  signUp = () => {

    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.controls['password'].value != this.signUpForm.controls['confirmPassword'].value) {
      this.signUpForm.controls['password'].setErrors({ 'incorrect': true })
      this.signUpForm.controls['confirmPassword'].setErrors({ 'incorrect': true })

      this.passwordValidation.errorMessage = "Passwords don't match."

    } else if (!this.signUpForm.valid) {
      let password = this.signUpForm.controls['password'].value

      let hasUpperCase = /[A-Z]/.test(password);
      let hasLowerCase = /[a-z]/.test(password);
      let hasNumbers = /\d/.test(password);

      if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
        this.passwordValidation.errorMessage = "Password requires Lower case (a-z), upper case (A-Z) and numbers (0-9)"
        this.signUpForm.controls['password'].setErrors({ 'incorrect': true })
        this.signUpForm.controls['confirmPassword'].setErrors({ 'incorrect': true })

      } else {

        this.signUpForm.controls['password'].setErrors(null)
        this.signUpForm.controls['confirmPassword'].setErrors(null)
        this.passwordValidation.errorMessage = ""
      }

    } else {

      this.signUpForm.controls['password'].setErrors(null)
      this.signUpForm.controls['confirmPassword'].setErrors(null)
      this.passwordValidation.errorMessage = ""

      let signUpReq = {
        firstName: this.signUpForm.controls['firstName'].value.trim(),
        lastName: this.signUpForm.controls['lastName'].value.trim(),
        phoneNumber: this.signUpForm.controls['phoneNumber'].value.trim(),
        email: this.signUpForm.controls['email'].value.trim(),
        password: this.signUpForm.controls['password'].value,
      }

      this.api.signUp(signUpReq).subscribe({
        next: (resp) => { console.log(resp) },
        error: (err) => { alert("sorry something went wrong.") },
        complete:() => { this.login() }
      })
    }
  }
}
