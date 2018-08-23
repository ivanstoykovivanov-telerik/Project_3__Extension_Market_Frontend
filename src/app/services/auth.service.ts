import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {AppComponent} from "../app.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user.model';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  //subscribe to changes in  currentUser 
  private messageSource = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")));
  currentUser = this.messageSource.asObservable();

  constructor(public http: HttpClient) { }

  changeUser(user: User) {
    this.messageSource.next(user)
  }

  public logIn(user: User){
    // // creating base64 encoded String from user name and password
    const base64Credential: string = btoa( user.username+ ':' + user.password);
    
    //Set headers  : 
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set("Authorization", "Basic " + base64Credential); 

    return this.http.get(AppComponent.API_URL+"/account/login",  {headers} )
       .pipe(
         map((data: any) => {
          console.log("After mapping: ");
          // console.log(typeof data);
          //  console.log("STRINGIFY  --------------");
          
          // !!!!!! TODO:  Show PAVEL
          // let data1 =  console.log(JSON.stringify(data)); 
          //console.log(data.principal.username);
          
          //  console.log("JSON parse only -----------");
          let dataNew = JSON.parse(JSON.stringify(data));
          let dataNew1 = JSON.stringify(data.principal);  //TODO: 
           
          localStorage.setItem('currentUser', JSON.stringify(dataNew.principal)); 
          this.changeUser(dataNew.principal);  
          return data; 
          })
       )
  }

  public logOut(user: User) {
    // remove user from local storage to log user out
    return this.http.post(AppComponent.API_URL+"logout", user); 
  }

}
