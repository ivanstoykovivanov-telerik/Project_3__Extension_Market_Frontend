import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm : FormGroup; 
  submitted = false; 
  errorMessage : string;  
  currentUser: User; 


  constructor( 
    private formBuilder: FormBuilder, 
    private authService : AuthService, 
    private router: Router, 
    private authenticationService: AuthenticationService,
  ) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [ Validators.minLength(3) ]],
      password: ['', [ Validators.minLength(3) ]] //TODO: password regex
    })

    this.authService.currentUser
      .subscribe(data => this.currentUser = data)
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit(){
    this.submitted = true; 
    
    //stop if form is invalid
    if (this.loginForm.invalid) {
      console.log("INVALID LOGIN FORM");
      return;
    }
    
    let username: string = this.f.username.value; 
    let password: string = this.f.password.value; 
    let user = new User(username, password); 
    this.login(user); 
  }


  //TODO: 
  login(user: User){
      this.authService.login(user)
        .subscribe(data => console.log(data)); 


      // let statusLogIn = this.authService.login(username, password); 
      
      // if(statusLogIn && this.currentUser.userStatus == "ENABLED"){
      //   this.router.navigate(['/home']);
      // }
      
      // if(!statusLogIn){
      //   this.errorMessage = "Incorrect username or password"; 
      // }
      
      // if(statusLogIn && this.currentUser.userStatus === "SUSPENDED")
      //   this.errorMessage = "Your account has been suspended"; 
      // }
  }
}


