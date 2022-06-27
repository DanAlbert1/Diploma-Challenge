import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }


  getCustomers = () => {
    return this.http.get(`${environment.apiURL}/Owner/get-customers`)

  }

  getOrders = (customerId:number) => {
    return this.http.get(`${environment.apiURL}/Owner/get-orders/${customerId}`)
  }


  getProducts = () => {
    return this.http.get(`${environment.apiURL}/Owner/get-products`)
  }

  getShipping = () => {
    return this.http.get(`${environment.apiURL}/Owner/get-shipping`)
  }

  createOrder = (userID:number, orderReq:any) =>{
    return this.http.post(`${environment.apiURL}/owner/${userID}/create-order`, orderReq)
  }

  getOrder = (orderId:number) => {
    return this.http.get(`${environment.apiURL}/owner/get-order/${orderId}`)
  }

  updateOrder = (orderId:number, updatedOrder:any) => {
    return this.http.put(`${environment.apiURL}/owner/update-order/${orderId}`,updatedOrder)
  }

  deleteOrder = (orderId:number) => {
    return this.http.delete(`${environment.apiURL}/owner/delete-order/${orderId}`)
  }


  register = (owner:any) => {
    return this.http.post(`${environment.apiURL}/owner/register`,owner)
  }

  login = (phone:any) => {
    console.log(phone)
    return this.http.post(`${environment.apiURL}/owner/login`, phone )
  }

  updateUser = (ownerId: any, owner:any) => {
    return this.http.put(`${environment.apiURL}/owner/update-owner/${ownerId}`, owner)
  }

  getPets = (userID: number) => {
    return this.http.get(`${environment.apiURL}/owner/get-pets/${userID}`)
  }

  createPets = (userID: number, pet:any) => {
    return this.http.post(`${environment.apiURL}/owner/${userID}/add-pet`,pet)
  }

  viewTreatments = (userID: number) => {
    return this.http.get(`${environment.apiURL}/owner/${userID}/view-treatments`)
  }

  getProcedures = () => {
    return this.http.get(`${environment.apiURL}/Owner/get-procedures`)
  }

  addTreatment = (treatment:any) => {
    return this.http.post(`${environment.apiURL}/Owner/add-treatment`, treatment)
  }

  getOwner = (userId:any) => {
    return this.http.get(`${environment.apiURL}/Owner/get-owner/${userId}`)
  }

}
