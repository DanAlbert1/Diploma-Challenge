import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["custId", "fullName", "segId","country", "state","postCode","region"];
  dataSource!: any;

  constructor(
    public api:ApiService,
    public dialog: MatDialog,
    public router:Router,
  ) {
  }

  ngOnInit(): void {
    this.api.getCustomers().subscribe({
      next:(resp:any) => {this.dataSource = new MatTableDataSource<any>(resp)}
    })
  }

  getCustomerOrders = (event:Event) => {
    this.router.navigate(['/customer', event]);
    console.log(event)
  }
}
