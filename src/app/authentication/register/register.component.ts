import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


/*
*   Responsible for both Register and Update User 
*/ 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    
    readonly  PASSWORD_PATTERN = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$"; 
    @Input() filled: boolean; 
    @Input() action: string;    
    @Output() updateDone: EventEmitter<any> = new EventEmitter<any>();
    currentUser: User; 
    registerForm: FormGroup;
    submitted = false;
    loading = false;  //making the submit button of the form active
    user: User ; 
    errorMessage: string; 
    usernameAlreadyExists: boolean ; 
    emailAlreadyExists: boolean ; 
    isUsernameUnique: boolean; 
    isEmailUnique: boolean; 


    constructor(
        private formBuilder: FormBuilder, 
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private authService: AuthService, 
        private toastr: ToastrService
    ) { }
    

    ngOnInit() {
        
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.minLength(3)],
            email: ['', [ Validators.email] ],
            password: ['', [ Validators.minLength(3), Validators.pattern(this.PASSWORD_PATTERN)]],
            confirm_password: ['', [ Validators.minLength(3), this.passwordValidator]]
        });
            //update form ****
        if(this.filled){
            this.authService.currentUser
                .subscribe(
                    data => this.currentUser = data
                );
            
            this.populateValues();     
        }

            //register form ***
        if(!this.filled){
            this.action = "Register"; 
        }
    }


    populateValues(){
        if(this.filled){
            this.f.firstName.setValue(this.currentUser.firstName);
            this.f.lastName.setValue(this.currentUser.lastName);
            this.f.username.setValue(this.currentUser.username);
            this.f.email.setValue(this.currentUser.email);
            this.f.password.setValue(this.currentUser.password);
        }
    }

    /*
    * a getter for easy access to form fields
    */
    get f() { return this.registerForm.controls; }

    
    /*
    * confirm if password and repeated password match 
    */
    passwordValidator(control: AbstractControl) {
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
        let lastName = this.f.lastName.value;  
        let username = this.f.username.value; 
        let email = this.f.email.value; 
        let password = this.f.password.value;
        let userStatus = "ENABLED"; 
      
        if(this.filled){

            //UPDATE EXISTING USER 
            console.log(this.currentUser.id);
            let user: User = new User(
                username, password, firstName, lastName, email, userStatus, this.currentUser.role,  this.currentUser.id);  
            this.update(user); 
            this.authService.changeUser(user); 
            //close the modal
            console.log("In");
            
            this.updateDone.emit(); 
     
        }else{
        
            //SAVE NEW USER 
            let user: User = new User(username, password, firstName, lastName, email, userStatus );  
            console.log(user);    
            this.register(user);   
      }
    }


    register(user: User) {
        this.accountService.createAccount(user)
            .subscribe(data => {
                if(data){
                    this.router.navigate(['/login']);
                    console.log("Account created successfully");
                    //TODO: Show Toast
                }
            }
        )
    }

    
    update(user: User){
        this.accountService.update(user)
            .subscribe(data => {
                //this.router.navigate(['/profile']);
                this.showSuccess(); 
                console.log(data);
               //TODO: show Toast
            })
    }  


    movetToLogin(){
        this.router.navigate(['../login'], {relativeTo: this.activatedRoute}); 
    }


    onUsernameAdd($event){
        console.log($event.target.value);
        let userName = $event.target.value; 
        this.accountService.checkIfUsernameIsUnique(userName)
            .subscribe((data :any) => {
                console.log(data); 
                this.isUsernameUnique = data; 
            })
    }
    
    
    onEmailAdd($event){
        console.log($event.target.value);
        let email = $event.target.value; 
        this.accountService.checkIfEmailIsUnique(email)
            .subscribe((data :any) => {
                console.log(data); 
                this.isEmailUnique = data; 
        })
    }

    showSuccess() {
        this.toastr.success('Profile data ', 'Updated');
      }

}
