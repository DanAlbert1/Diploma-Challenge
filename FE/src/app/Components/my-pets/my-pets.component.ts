import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';



@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.scss']
})
export class MyPetsComponent implements OnInit {

  //how will I differentiate who is an admin and who is not
  // use meta data to differentiate between users




  constructor(
    public auth: AuthService,

  ) { }

  ngOnInit(): void {
  }

}
