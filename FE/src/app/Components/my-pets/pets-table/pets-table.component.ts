import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/Services/api.service';

export interface Pets {
  ownerId: number,
  petName: string,
  type:string
}

@Component({
  selector: 'app-pets-table',
  templateUrl: './pets-table.component.html',
  styleUrls: ['./pets-table.component.scss']
})



export class PetsTableComponent implements OnInit {

  @Output() selectedPet = new EventEmitter<any>();

  constructor(
    public auth: AuthService,
    public api: ApiService,
    public http:HttpClient
  ) { }

  petData: Pets[] = []

  displayedColumns: string[] = ['Pet Name', 'type']

  role: string | null = null;
  isAdmin = false;

  selectedRow: any;

  selectRow = (row: any) => {
    console.log(row)
    this.selectedRow = row;
    this.selectedPet.emit(this.selectRow)
  }

  getPets = () => {
    this.api.checkRole().subscribe({

      next: (resp: any) => { this.role = resp.claim },

      error: (err) => { console.log(err) },

      complete: () => {
        if (this.role == "write:admin") {
          this.api.adminGetPets().subscribe({
            next: (resp: any) => { this.petData = resp as Pets[] },
            complete: () => {
              this.isAdmin = true;
              this.displayedColumns = ['Owner ID','Pet Name', 'type']
            }
          })

        } else {

          this.api.getPets().subscribe({
            next: (resp) => { this.petData = resp as Pets[] },
            complete:() => { this.displayedColumns = ['Pet Name', 'type'] }
          }

          )

        }
      }

    })
  }

  ngOnInit(): void {

    this.getPets()


  }
}
