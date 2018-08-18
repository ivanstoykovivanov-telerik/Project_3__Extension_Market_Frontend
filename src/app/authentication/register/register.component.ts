import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User ; 

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log("Register form submitted");
    console.log(form.value);
    
  }
}
