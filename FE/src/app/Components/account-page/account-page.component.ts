import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})

export class AccountPageComponent {

  ownerDetails!: any;
  userID!: number;

  ownerForm = this.fb.group({
    ownerId: [{ value: '2234', disabled: true }],
    surname: [null, Validators.required],
    firstName: [null, Validators.required],
    phone: [null, Validators.required]
  });

  hasUnitNumber = false;


  constructor(
    private fb: FormBuilder,
    public api: ApiService,
    private cookieService:CookieService
  ) { }


  getOwner = () => {
    this.api.getOwner(this.userID).subscribe({
      next: (resp: any) => { this.ownerDetails = resp, console.log(resp) },
      error: (err) => console.error(err),
      complete: () => {
        this.ownerForm.controls['ownerId'].setValue(this.ownerDetails.ownerId)
        this.ownerForm.controls['surname'].setValue(this.ownerDetails.surname)
        this.ownerForm.controls['firstName'].setValue(this.ownerDetails.firstName)
        this.ownerForm.controls['phone'].setValue(this.ownerDetails.phone)
      }
    })
  }

  updateOwner = () => {
  let updatedOwner = {
    Surname:this.ownerForm.controls['surname'].value,
    FirstName: this.ownerForm.controls['firstName'].value,
    Phone: this.ownerForm.controls['phone'].value
  }

    this.api.updateUser(this.userID, updatedOwner).subscribe({
      next: (resp => console.log(resp)),
      error: (err:any) => console.log(err),
      complete:() => this.getOwner()
    })
  }


  ngOnInit(): void {
    this.userID = + this.cookieService.get('UserID')
    this.getOwner()
  }

  onSubmit(): void {
    this.updateOwner();
  }
}
