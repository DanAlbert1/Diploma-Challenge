import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/Services/api.service';

export interface Procedure {
  procedureID: number,
  description: string,
  price:number
}

@Component({
  selector: 'app-procedure-page',
  templateUrl: './procedure-page.component.html',
  styleUrls: ['./procedure-page.component.scss']
})

export class ProcedurePageComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public api: ApiService
  ) { }

  procedureData: Procedure[] = []

  displayedColumns: string[] = ['ProcedureID', 'Description','Price']


  ngOnInit(): void {
    this.api.getProcedures().subscribe(
      (resp) => {
        this.procedureData = resp as Procedure[]
      }
    )
  }

}
