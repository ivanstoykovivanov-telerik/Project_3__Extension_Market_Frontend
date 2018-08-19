import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup; 
  submitted = false; 

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [ Validators.minLength(6) ]],
      password: ['', [ Validators.minLength(6) ]]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit(){
    this.submitted = true; 
    console.log("Successfully LOGGED IN ");
    
    const user =  new User(this.f.username.value, this.f.password.value); 
    console.log("Logged User: ");
    console.log(user);


    //stop if is invalid
    if (this.loginForm.invalid) {
      console.log("Invalid");
      return;
   }

    //TODO
    //check if user is in the DB 

    //allow access to home page 

  }
}
