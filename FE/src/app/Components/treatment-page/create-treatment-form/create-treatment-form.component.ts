import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/Services/api.service';

export interface Treatment {
  PetName:string,
  ProcedureID: number,
  Date: Date,
  Notes: string
}

@Component({
  selector: 'app-create-treatment-form',
  templateUrl: './create-treatment-form.component.html',
  styleUrls: ['./create-treatment-form.component.scss']
})
export class CreateTreatmentFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public api: ApiService,
    public dialog: MatDialog
  ) { }

  passwordValidation = {
    errorMessage: ""
  }

  role: any = null;
  isAdmin: boolean = false;

  checkError = (formControl: any) => {
    let isError = formControl.errors != null ? true : false

    return isError;
  }

  getFormData = () => {
    this.api.checkRole().subscribe({
      next: (resp: any) => { this.role = resp.claim, console.log(resp) },
      error: (err) => { console.log(err) },
      complete: () => {

        this.api.getProcedures().subscribe(
          (resp) => {
            this.procedures = resp;
          }
        )

        if (this.role == "write:admin") {

          this.isAdmin = true;

          this.api.adminGetPets().subscribe({

            next:(resp) => { this.pets = resp, console.log(resp) }
          })

        } else {

          this.api.getPets().subscribe(
            (resp) => {
              this.pets = resp;
            }
          )

        }

      }
    })
  }

  createTreatmentForm = this.fb.group({
    Pet: ['', Validators.required],
    Procedure: ['', Validators.required],
    Date: ['', Validators.required],
    Notes: ['', [Validators.required]],
  })

  procedures: any = []
  selectedProcedure: any = 0;
  pets:any = []

  ngOnInit(): void {
    this.getFormData();
  }

  closedialog = () => {
    this.dialog.closeAll();
  }

  createProcedure = () => {
    console.log(this.createTreatmentForm.controls)

    if (this.createTreatmentForm.valid) {
      let treatment: Treatment = {
        PetName: this.createTreatmentForm.controls['Pet'].value,
        ProcedureID: this.createTreatmentForm.controls['Procedure'].value.procedureID,
        Date: this.createTreatmentForm.controls['Date'].value,
        Notes: this.createTreatmentForm.controls['Notes'].value
      }

      this.api.createTreatment(treatment).subscribe(
        (resp) => { console.log(resp)}
      )

      this.closedialog();
    }
  }

  // signUp = () => {

  //   this.signUpForm.markAllAsTouched();
  //   if (this.signUpForm.controls['password'].value != this.signUpForm.controls['confirmPassword'].value) {
  //     this.signUpForm.controls['password'].setErrors({ 'incorrect': true })
  //     this.signUpForm.controls['confirmPassword'].setErrors({ 'incorrect': true })

  //     this.passwordValidation.errorMessage = "Passwords don't match."

  //   } else if (!this.signUpForm.valid) {
  //     let password = this.signUpForm.controls['password'].value

  //     let hasUpperCase = /[A-Z]/.test(password);
  //     let hasLowerCase = /[a-z]/.test(password);
  //     let hasNumbers = /\d/.test(password);

  //     if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
  //       this.passwordValidation.errorMessage = "Password requires Lower case (a-z), upper case (A-Z) and numbers (0-9)"
  //       this.signUpForm.controls['password'].setErrors({ 'incorrect': true })
  //       this.signUpForm.controls['confirmPassword'].setErrors({ 'incorrect': true })

  //     } else {

  //       this.signUpForm.controls['password'].setErrors(null)
  //       this.signUpForm.controls['confirmPassword'].setErrors(null)
  //       this.passwordValidation.errorMessage = ""
  //     }

  //   } else {
  //     this.signUpForm.controls['password'].setErrors(null)
  //     this.signUpForm.controls['confirmPassword'].setErrors(null)
  //     this.passwordValidation.errorMessage = ""

  //     let signUpReq = {
  //       firstName: this.signUpForm.controls['firstName'].value,
  //       lastName: this.signUpForm.controls['lastName'].value,
  //       phoneNumber: this.signUpForm.controls['phoneNumber'].value,
  //       email: this.signUpForm.controls['email'].value,
  //       password: this.signUpForm.controls['password'].value,
  //     }
  //     console.log(signUpReq)
  //     this.api.signUp(signUpReq).subscribe(
  //       (resp) => console.log(resp)
  //     )
  //   }
  // }
}
