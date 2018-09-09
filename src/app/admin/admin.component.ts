import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { AdminExtensionsPerUserComponent } from '../admin-extensions-per-user/admin-extensions-per-user.component';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];
  currentUser : User;
  @ViewChild(AdminExtensionsPerUserComponent) child;
  constructor(
    private userService: UserService, 
    private adminService: AdminService
  ) { }

  ngOnInit() {

    //GET ALL USERS 
    this.adminService.getAllUsers()
      .subscribe( data => {
        this.users = data;
      });
  }

  changeStatus(event, user: User){
    if(user.userStatus === "DISABLED"){
      user.userStatus = "ENABLED"; 
      console.log(user);
      this.adminService.enableUser(user)
        .subscribe();
      return; 
    } 

    if(user.userStatus === "ENABLED"){
      user.userStatus = "DISABLED"; 
      console.log(user);
      this.adminService.disableUser(user)
        .subscribe();
      return;
    }
    
  }


  findProductsOf(user: User){
    // this.currentUser = user;
    // console.log(this.currentUser);
    this.child.getUser(user);
  }


  isActive(user: User): boolean{
    if(user.userStatus === "DISABLED"){
      console.log("In");
      return true ; 
    }
    
    if(user.userStatus === "ENABLED"){
      console.log("In");
      return false ; 
    }
  }

  // ngAfterViewInit() {
  //   this.message = this.child.message
  // }

}
