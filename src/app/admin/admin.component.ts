import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];
  currentUser : User; 

  constructor(
    private userService: UserService 
  ) { }

  ngOnInit() {
    this.userService.getAllUsers()
      .subscribe( data => {
        console.log("Users from admin");
        console.log(data);
        
        this.users = data; 
      }); 
  }

  deActivateUser(event, user: User){
    user.active = !user.active; 
    console.log(user);
   
    this.userService.save(user).subscribe(); 
  }

  findProducts(user: User){
    this.currentUser = user; 
    
    //navigate to another component UserProducts

    //
  }


}
