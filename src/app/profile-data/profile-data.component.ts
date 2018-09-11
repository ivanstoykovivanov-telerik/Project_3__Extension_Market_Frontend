import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {
  currentUser: User; 

  constructor(
    private authService: AuthService
  ) { }
  
  ngOnInit() {
    this.authService.currentUser.subscribe(data => this.currentUser = data)
  }

}
