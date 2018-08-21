import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


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
 
    constructor(
        private formBuilder: FormBuilder, 
        private activatedRoute: ActivatedRoute,
        private router: Router,
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
      console.log('SUCCESSFULLY REGISTERED ');
      console.log(this.f.username.value);
      

      
        // stop here if form is invalid
        if (this.registerForm.invalid) {
          console.log("Invalid registration form");
          return;
        }
    }


    movetToLogin(){
        this.router.navigate(['../login'], {relativeTo: this.activatedRoute}); 
    }

}
