import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Z_FULL_FLUSH } from 'zlib';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    loading = false;  //making the submit button of the form active
    user: User ; 
    errorMessage: string; 
 
    constructor(
        private formBuilder: FormBuilder, 
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
    ) { }
 
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.minLength(3)],
            email: ['', [ Validators.email] ],
            password: ['', [ Validators.minLength(3)]],
            confirm_password: ['', [ Validators.minLength(3), this.passValidator]]
        });
    }
 
    // a getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    

    //confirm if passwords match 
    passValidator(control: AbstractControl) {
        if (control && (control.value !== null || control.value !== undefined)) {
            const cnfpassValue = control.value;
    
            const passControl = control.root.get('password'); // magic is this
            if (passControl) {
                const passValue = passControl.value;
                if (passValue !== cnfpassValue || passValue === '') {
                    return {
                        isError: true
                    };
                }
            }
        }
        return null;
    }

    onSubmit() {
      this.submitted = true;
      
      // stop here if form is invalid
      if (this.registerForm.invalid) {
        console.log("Invalid registration form");
        return;
      }
      
      console.log('REGISTERED FORM SUBMITTED: ');
      console.log(this.f.username.value);
      console.log(this.f.email.value);

      let firstName = this.f.firstName.value;  
      let username = this.f.username.value; 
      let lastName = this.f.lastName.value;  
      let email = this.f.email.value; 
      let password = this.f.password.value;

      //For test purposes the email is the username right now
      let user: User = new User(email, password);  
      console.log(user);
      this.register(user);   
    }

    register(user) {
        this.accountService.createAccount(user).subscribe(data => {
            this.router.navigate(['/login']);
            console.log("Account created successfully");
          }, err => {
            console.log(err);
            this.errorMessage = "username already exist";
          }
        )
      }


    movetToLogin(){
        this.router.navigate(['../login'], {relativeTo: this.activatedRoute}); 
    }

}
