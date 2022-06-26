import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/Services/api.service';
import { UserDetailsFormComponent } from './user-details-form/user-details-form.component';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {

  owner: any = {};

  constructor(
    public api: ApiService,
    public auth: AuthService,
    public dialog: MatDialog
  ) { }

  openUserForm() {
    const dialogRef = this.dialog.open(UserDetailsFormComponent);
    dialogRef.afterClosed().subscribe(
      () => {
        this.api.getOwner().subscribe((resp:any) => this.owner = resp.Data );
      }
    );

  }

  ngOnInit(): void {
    this.api.getOwner().subscribe(
      (resp: any) => { this.owner = resp.Data}
    )
  }

}
