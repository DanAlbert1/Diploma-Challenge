import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  orderForm = this.fb.group({
    orderDate:[null, Validators.required],
    shippingDate:[null, Validators.required],
    productId: [null, Validators.required],
    shipMode: [null, Validators.required],
    quantity: [null, Validators.required]
  });

  products!:any
  shipping!:any
  customerId!:any

  constructor(
    private fb: FormBuilder,
    public api:ApiService,
    private _route: ActivatedRoute,
    private route: Router
    ) {
      
      this._route.params.subscribe( (params) => {
        this.customerId = params['id']
      })

    }

    ngOnInit(): void {

      this.api.getProducts().subscribe({
        next:(resp:any) => {this.products = resp, console.log(resp)},
      })
  
      this.api.getShipping().subscribe({
        next:(resp) => {this.shipping = resp, console.log(resp)}
      })
      
    }


  onSubmit(): void {
    console.log(this.orderForm.valid)
    if(this.orderForm.valid){
      let newOrder = {
        customerId: + this.customerId,
        productId:+ this.orderForm.controls['productId'].value,
        orderDate:this.orderForm.controls['orderDate'].value,
        ShipDate:this.orderForm.controls['shippingDate'].value,
        quantity: + this.orderForm.controls['quantity'].value,
        shipMode: + this.orderForm.controls['shipMode'].value,
      }
      this.api.createOrder(this.customerId, newOrder).subscribe({
        next:(resp) => console.log(resp),
        error:(err) => {console.log(err)},
        complete:() => {this.route.navigate(['customer',this.customerId])}
      })
    }
    }

    
}
