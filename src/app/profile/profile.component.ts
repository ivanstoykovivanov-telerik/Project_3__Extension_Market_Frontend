import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User; 

  constructor(
    private router: Router,
    private authService : AuthService
  ) { }

  ngOnInit() {
    //this.authService.currentUser.subscribe(data => this.currentUser = data)
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Current User");
    console.log(this.currentUser);
  }


  goToUserData(){
    console.log("Clicked...");
    
    this.router.navigate([{ outlets: { profileDetails: [ 'profileData'] }}]); 
    
  }
}
