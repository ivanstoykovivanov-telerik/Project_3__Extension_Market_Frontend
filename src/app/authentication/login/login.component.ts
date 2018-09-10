import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";
import { AuthenticationService } from '../../services/authentication.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: User; 
  loginForm : FormGroup; 
  submitted = false; 
  errorMessage : string;  
  isLoggedIn: boolean = false; 
  isAdmin : boolean = false; 
  isUser: boolean =  false; 


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

    //TODO: Remove 
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


  login(user: User){
    this.authService.login(user)
      .subscribe(
        (data : any) => {
          console.log(data); 
          
          if(!data){
            this.errorMessage = "Incorrect username or password"; 
          }

          if(data.userStatus === "ENABLED"){
            this.currentUser = data; 
            this.authService.changeUser(data); 
            this.authService.loggedIn = true;
            console.log(data);
            if(data.role === "USER"){
              this.authService.isUser = true;
            }else {
              this.authService.isAdmin = true;
            }

            
            this.router.navigate(['/home']);
          }

          if(data.userStatus === "SUSPENDED"){
            this.router.navigate(['/login']);
            this.errorMessage = "Your account has been suspended"; 
          }
        })
}


  

}


