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
  errorMesssage : string;  

  constructor( 
    private formBuilder: FormBuilder, 
    private authService : AuthService, 
    private router: Router, 
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [ Validators.minLength(3) ]],
      password: ['', [ Validators.minLength(3) ]]
    })
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
    
    // LOGIN TO BACKEND
    const user =  new User(username, password); 
    this.login(user); 
  }

  login(user: User){
    this.authenticationService.login(user.username, user.password)
      .subscribe(
        data => console.log(data)
      )
  }


  // __login(user: User){
    
  //  // TODO: Check if user is not deactivated by admin
    
  //   this.authService.logIn(user)
  //     .subscribe(
  //       data => {
  //         if (data) {
  //           console.log("Successfully LOGGED IN ");
  //           this.router.navigate(['/home']);
  //         }
  //     }, 
  //       err => {
  //         this.errorMesssage = "Incorrect username or password";
  //       });
  // }

}
