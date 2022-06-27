import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { OrderFormComponent } from './order-form/order-form.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  customerId!:any
  dataSource!:any
  displayedColumns:string[] = [
"description",
"orderDate",
"quantity",
"shipDate",
"shipMode"
  ]

  constructor(
    private _route: ActivatedRoute,
    private route:Router,
    public api:ApiService,
  ) {

  }

  getOrders = (customer:number) => {

    this.api.getOrders(customer)
        .subscribe({
          next:(resp) => { this.dataSource = resp},
          error:(err) => {console.log(err)},
          complete:() => {console.log(this.dataSource)}
        })

  }

  navOrders = () =>{
    console.log(this.customerId)
    this.route.navigate(['order-form',this.customerId])
  }

  editOrder = (row:any) => {
    this.route.navigate(['order',row.id])
  }

  

  ngOnInit(): void {
    this._route.params.subscribe({
      next:(resp:any) => { this.customerId = + resp['id'], this.getOrders(+ resp['id'])},
    })
  }

}
