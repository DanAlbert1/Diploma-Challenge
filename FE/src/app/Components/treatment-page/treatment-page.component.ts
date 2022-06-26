import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/Services/api.service';
import { CreateTreatmentFormComponent } from './create-treatment-form/create-treatment-form.component';

export interface Treatment
{
    ID: number,
    OwnerId: number,
    PetName: string,
    ProcedureID: number,
    Date: any,
    Notes: string,
    Payment: number
}

@Component({
  selector: 'app-treatment-page',
  templateUrl: './treatment-page.component.html',
  styleUrls: ['./treatment-page.component.scss']
})
export class TreatmentPageComponent implements AfterViewInit {

  isAdmin: boolean = false
  role: any = null
  treatmentData: Treatment[] = []
  displayedColumns: string[] = ["ID", "Owner Id", "Pet Name", "Procedure ID", "Date", "Notes", "Payment", "Amount Owed"]

  dataSource: MatTableDataSource<Treatment>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public auth: AuthService,
    public api: ApiService,
    public dialog: MatDialog
  ) {
    this.getTreatments();

    this.dataSource = new MatTableDataSource(this.treatmentData);
  }

  openTreatmentForm() {
    const dialogRef = this.dialog.open(CreateTreatmentFormComponent);
    dialogRef.afterClosed().subscribe(
      () => {
        this.getTreatments();
      }
    );

  }



  getTreatments = () => {
    this.api.checkRole().subscribe({

      next: (resp: any) => { this.role = resp.claim },

      error: (err) => { console.log(err) },

      complete: () => {
        if (this.role == "write:admin") {
          this.api.adminViewTreatments().subscribe({
            next: (resp) => {
              this.isAdmin = true;
              this.treatmentData = resp as Treatment[]
              this.dataSource = new MatTableDataSource(this.treatmentData);
              this.displayedColumns =  ["ID", "Owner Id", "Pet Name", "Procedure ID", "Date", "Notes", "Payment", "Amount Owed", "Paid"]
              this.dataSource.paginator = this.paginator;
            },

            complete: () => { }

          })

        } else {

          this.api.viewTreatments().subscribe({
            next: (resp) => { this.treatmentData = resp as Treatment[] },
            complete: () => {
              this.dataSource = new MatTableDataSource(this.treatmentData)
              this.dataSource.paginator = this.paginator;
            }
        })

        }
      }
    })
  }

  markAsPaid = (treatmentID: number) => {
    this.api.markTreatmentAsPaid(treatmentID).subscribe({
      next: (resp) => { console.log(resp) },
      error: (err) => { console.log(err) },
      complete: () => {
        this.getTreatments();
      }
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
