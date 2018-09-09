import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {AppComponent} from "../app.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  
  loggedIn: boolean = false; 
  dummy: User  = new User("ivanov", "bonbon800", "Ivan", "Ivanov", "ivanov@gmail.com", "ENABLED", 1); 
  emptyUser : User = new User("", "", "", "", "", "ENABLED", 0); 


  private userSource = new BehaviorSubject<User>(this.dummy);
  currentUser = this.userSource.asObservable();


  constructor(public http: HttpClient) { }


  changeUser(user: User) {
    this.userSource.next(user);
  }

  // OLD //TODO: 
  // login(username: string, password: string){
  //   this.http.post(`${AppComponent.API_URL}/login`,  {
  //       username: username, 
  //       password: password
  //     })
  //     .subscribe( (data: any) => {
  //       if(data){
  //         this.changeUser(data); 
  //         this.loggedIn = true; 
  //         return true;  
  //       } 
  //       return false ; 
  //     });
  // }
  

  login(user: User){
    //let user = new User(username, password); 
      
    return this.http.post(`${AppComponent.API_URL}/login`, user ); 
  }      

  public logOut(user: User) {
    // remove user from local storage to log user out
    // return this.http.post(AppComponent.API_URL+"/logout", user); 
  }


}
