import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/Services/api.service';

export interface Owner{
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber:string
}

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss']
})
export class UserDetailsFormComponent implements OnInit {

  constructor(
    public api: ApiService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  editUserForm = this.fb.group({
    Email: ['', [Validators.required]],
    FirstName: ['', [Validators.required]],
    LastName: ['', [Validators.required]],
    PhoneNumber:['',[Validators.required]]
  })

  ngOnInit(): void {
    this.api.getOwner().subscribe(
      (resp: any) => {
        this.editUserForm.controls['Email'].setValue(resp.Data.email)
        this.editUserForm.controls['FirstName'].setValue(resp.Data.firstname)
        this.editUserForm.controls['LastName'].setValue(resp.Data.surname)
        this.editUserForm.controls['PhoneNumber'].setValue(resp.Data.phone)
      }
    )
  }

  closedialog = () => {
    this.dialog.closeAll();
  }

  save = () => {
    if (this.editUserForm.valid) {
      let owner: Owner = {
        firstName: this.editUserForm.controls['FirstName'].value,
        lastName: this.editUserForm.controls['LastName'].value,
        phoneNumber: this.editUserForm.controls['PhoneNumber'].value,
        email:this.editUserForm.controls['Email'].value,
      }

      this.api.updateOwner(owner).subscribe(
        (resp) => {
          console.log(resp)
          this.closedialog()
        }
      )

    }
  }

}
