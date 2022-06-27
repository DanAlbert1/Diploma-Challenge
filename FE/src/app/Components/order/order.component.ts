import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderId!:any
  products!:any
  shipping!:any
  order!:any

  orderForm = this.fb.group({
    orderDate:[null, Validators.required],
    shippingDate:[null, Validators.required],
    productId: [null, Validators.required],
    shipMode: [null, Validators.required],
    quantity: [null, Validators.required]
  });

  constructor(
    private _route:ActivatedRoute,
    public api:ApiService,
    private fb: FormBuilder,
    private route:Router,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe({
      next:(resp:any) => { this.orderId = + resp['id'],console.log(this.orderId)},
    })

    this.api.getProducts().subscribe({
      next:(resp:any) => {this.products = resp, console.log(resp)},
    })

    this.api.getShipping().subscribe({
      next:(resp) => {this.shipping = resp, console.log(resp)}
    })

    this.api.getOrder(this.orderId).subscribe({
      next:(resp:any) => {this.order = resp, console.log(resp) },
      complete:() => {
        this.orderForm.controls['productId'].setValue(this.order.productId.toString()),
        this.orderForm.controls['orderDate'].setValue(new Date(this.order.orderDate).toISOString().split('T')[0]),
        this.orderForm.controls['shippingDate'].setValue(new Date (this.order.shipDate).toISOString().split('T')[0]),
        this.orderForm.controls['quantity'].setValue(this.order.quantity.toString()),
        this.orderForm.controls['shipMode'].setValue(this.order.shipMode.toString())
      }
    })
  }

  
  deleteOrder = () => {
    this.api.deleteOrder(this.orderId).subscribe({
      next:(resp) => {console.log(resp)},
      complete:() => {
        this.route.navigate(['customers'])
      }
    })
  }

  onSubmit = () => {
    if(this.orderForm.valid){
      let updatedOrder = {      
        productId:+ this.orderForm.controls['productId'].value,
        orderDate:this.orderForm.controls['orderDate'].value,
        shipDate:this.orderForm.controls['shippingDate'].value,
        quantity: + this.orderForm.controls['quantity'].value,
        shipMode: + this.orderForm.controls['shipMode'].value,
      }

    this.api.updateOrder(this.orderId, updatedOrder).subscribe((resp) => {console.log(resp)})
  }

  }
}

