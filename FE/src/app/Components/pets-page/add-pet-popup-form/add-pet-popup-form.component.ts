import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-add-pet-popup-form',
  templateUrl: './add-pet-popup-form.component.html',
  styleUrls: ['./add-pet-popup-form.component.scss']
})
export class AddPetPopupFormComponent implements OnInit {

  userID!: number;

  error = {
    isError: false,
    message: ""
  }



  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    public api: ApiService,
    private cookieService: CookieService
  ) { }

  AddPetForm = this.fb.group({
    PetName: ['', Validators.required],
    Type: ['', Validators.required],
  })

  closedialog = () => {
    this.dialog.closeAll();
  }

  createPet = () => {
    if (this.AddPetForm.valid) {
      this.userID = + this.cookieService.get('UserID')
      let newPet = {
        OwnerID: this.userID,
        PetName: this.AddPetForm.controls['PetName'].value.trim(),
        Type: this.AddPetForm.controls['Type'].value.trim()
      }

      this.api.createPets(this.userID, newPet).subscribe({
        next: (resp: any) => { console.log(resp) },
        error: (err) => { this.error = {isError:true, message:err.error.Message } },
        complete: () => {
          this.closedialog();
        }
      })
    }

  }

  ngOnInit(): void {
  }

}
