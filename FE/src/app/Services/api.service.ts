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
