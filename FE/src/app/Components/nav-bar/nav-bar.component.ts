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
  ) {

    this.router.events.subscribe({
      next: (ev) => {
        if (ev instanceof NavigationEnd) {
          this.userID = this.cookieService.get('UserID')
          this.IsLoggedIn = this.userID ? true : false;
        }
      }
    })
  }

  ngOnInit(): void {
    this.userID = this.cookieService.get('UserID')
    this.IsLoggedIn = this.userID ? true : false;
    this.router.navigate(['/pets'])
  }

  logout = () => {
    this.cookieService.deleteAll()
    this.IsLoggedIn = false;
    this.router.navigate(['login'])
  }
}
