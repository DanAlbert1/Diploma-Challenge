import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/Services/api.service';
import { TreatmentFormDialogComponent } from './treatment-form-dialog/treatment-form-dialog.component';

@Component({
  selector: 'app-treatment-page',
  templateUrl: './treatment-page.component.html',
  styleUrls: ['./treatment-page.component.scss']
})
export class TreatmentPageComponent implements AfterViewInit {

  dataSource!: any;
  displayedColumns = ["ID", "PetID", "PetName","ProcedureName", "Date", "Notes", "Payment","AmountOwed"];

  userID!:number

  constructor(
    private cookieService: CookieService,
    public api:ApiService,
    public dialog: MatDialog
  ) { }

  getTreatments = () => {
    this.api.viewTreatments(this.userID).subscribe({
      next:(resp:any) => { this.dataSource = new MatTableDataSource<any>(resp.Data), console.log(resp.Data) }
    })
  }

  openTreatmentForm(){
    const dialogRef = this.dialog.open(TreatmentFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getTreatments();
    });
  }

  ngAfterViewInit(): void {
    this.userID = + this.cookieService.get('UserID')
    this.getTreatments();
  }

}
