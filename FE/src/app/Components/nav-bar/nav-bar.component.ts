import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  IsLoggedIn: boolean = true;
  userID!:string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

   

  ngOnInit(): void {
  }

}
