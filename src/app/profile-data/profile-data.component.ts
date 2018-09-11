import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {
  
  public lgModal: ModalDirective;  
  currentUser: User; 


  constructor(
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.authService.currentUser.subscribe(data => this.currentUser = data)
  }

  
  hideModal($event){
    console.log($event);
    this.lgModal.hide(); 
  }
}
