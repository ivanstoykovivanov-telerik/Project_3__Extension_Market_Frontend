import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup; 
  submitted = false; 
  //user: User;
  errorMesssage : string;  


  constructor( 
    private formBuilder: FormBuilder, 
    private authService : AuthService
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
    console.log("Successfully LOGGED IN ");
    
    const user =  new User(this.f.username.value, this.f.password.value); 
    console.log("Logged User: ");
    console.log(user);
    this.login(user); 

    //stop if is invalid
    if (this.loginForm.invalid) {
      console.log("Invalid");
      return;
   }

    //TODO
    //check if user is in the DB 

    //allow access to home page 

  }

  login(user: User){
    this.authService.logIn(user)
    .subscribe(data => {
      // login successful if there's a jwt token in the response
      let user = data /// json().principal;// the returned user object is a principal object
      if (user) {
        // store user details  in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    });
    
    
    // .subscribe(data=>{
    //     this.router.navigate(['/profile']);
    //     },err=>{
    //     this.errorMessage="error :  Username or password is incorrect";
    //     }
    //   )
  }

}
