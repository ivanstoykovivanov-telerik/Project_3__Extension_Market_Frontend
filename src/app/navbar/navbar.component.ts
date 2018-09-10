import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  currentUser : User;
  loggedIn: boolean; 

  constructor( 
    private authService : AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    //get the current user reactively
    this.authService.currentUser.subscribe(data => this.currentUser = data);
    this.authService.loggedIn = this.loggedIn; 
  }


  logOut() {
    this.authService.changeUser(null); 
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    console.log("successfully logged out");

    this.authService.logOut(this.currentUser)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
          localStorage.removeItem('currentUser');
          console.log("successfully logged out");
        }
      );
  }

}
