import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";

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
    private router: Router
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
    const user =  new User(this.f.username.value, this.f.password.value); 
    console.log("Logged User: ");
    console.log(user);
    // LOGIN
    this.login(user); 

    //stop if form is invalid
    if (this.loginForm.invalid) {
      console.log("Invalid");
      return;
   }

  }

  login(user: User){
    this.authService.logIn(user)
    .subscribe(
      data => {
        // login successful if there's a jwt token in the response
        console.log("Successfully LOGGED IN ");
        //localStorage.setItem('currentUser', JSON.stringify(data.principal)); 
        console.log(data);
        // let user = data /// json().principal;// the returned user object is a principal object
        if (data) {
          // store user details  in local storage to keep user logged in between pages 
          // localStorage.setItem('currentUser', JSON.stringify(data));
          // localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/home']);
        }
    }, 
      err => {
        this.errorMesssage = "Incorrect username or password";
      });
  }

}
