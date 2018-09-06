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

  constructor( 
    private authService : AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    //get the current user reactively
    this.authService.currentUser.subscribe(data => this.currentUser = data);
    // localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    // console.log(this.currentUser);
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
          // console.log(data);
        }
        // ,
        // error => {
        //   console.log("Error logging out: ");
        //   console.log(error);
        // }
      );
  }

}
