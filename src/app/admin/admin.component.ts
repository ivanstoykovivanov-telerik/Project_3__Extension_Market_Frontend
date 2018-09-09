import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { AdminExtensionsPerUserComponent } from '../admin-extensions-per-user/admin-extensions-per-user.component';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

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
      private adminService: AdminService, 
      private toastr: ToastrService
    ) { }

    ngOnInit() {

      this.adminService.getAllUsers()
        .subscribe( data => {
          this.users = data;
        });
    }

    changeStatus(event, user: User){
      if(user.userStatus === "DISABLED"){
        user.userStatus = "ENABLED"; 
        console.log(user);
        this.showSuccess(user.username, "Enabled");   
        this.adminService.enableUser(user)
          .subscribe();
        return; 
      } 

      if(user.userStatus === "ENABLED"){
        user.userStatus = "DISABLED"; 
        console.log(user);
        this.showSuccess(user.username, "Disabled"); 
        this.toastr.success(user.username, "Disabled");
        this.adminService.disableUser(user)
          .subscribe();
        return;
      }
    }


    findProductsOfUser(user: User){
      this.child.getUser(user);
    }


    isActive(user: User): boolean{
      if(user.userStatus === "DISABLED"){
        return true ; 
      }
      
      if(user.userStatus === "ENABLED"){
        return false ; 
      }
    }


    /* TOAST  */ 
  showSuccess(title: string , content: string) {
    this.toastr.success(title, content);
  }

}
