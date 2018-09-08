import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {
  constructor(public http: HttpClient) { }

  createAccount(user: User){
    return this.http.post(`${AppComponent.API_URL}/register`, user); 
  }

  update(user : User){
    //TODO:  Lucia 
    // console.log("In ");
    // console.log(user);
    return this.http.post(`${AppComponent.API_URL}/users/update`, user); //TODO: check backend 
  }


  checkIfEmailIsUnique(email: string){
    return this.http.post(`${AppComponent.API_URL}/users/user/email`, email); 
  }


  checkIfUsernameIsUnique(username: string){
    return this.http.post(`${AppComponent.API_URL}/users/user/email`, username); 
  }
}



