import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {AppComponent} from "../app.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
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
    console.log("Log in ***************");
    console.log(user);
     
    const base64Credential: string = btoa( user.username+ ':' + user.password);
    // headers.append("Authorization", "Basic " + base64Credential);

    // let options = new RequestOptions();
    // options.headers=headers;
    
    //Set headers  : 
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set("Authorization", "Basic " + base64Credential); 

    return this.http.get(AppComponent.API_URL+"/account/login" ,  {headers} )
       .pipe(
         map(data => {
          console.log("After mapping: ");
          // console.log(typeof data);
          //  console.log("STRINGIFY  --------------");
           
          // let data1 =  console.log(JSON.stringify(data)); 
          // console.log(data1.principal.username);
          
          //  console.log("JSON parse only -----------");
          let dataNew =JSON.parse(JSON.stringify(data));
           
          //  console.log("Data new: ");
          //  console.log(dataNew);
           
           console.log("Username --------------: ");
           console.log(dataNew.principal.username);
           localStorage.setItem('currentUser', JSON.stringify(dataNew.principal)); 
           this.changeUser(dataNew.principal);  
          return data; 
          })
       )
      // // login successful if there's a jwt token in the response
      // let user = response.json().principal;// the returned user object is a principal object
      // if (user) {
      //   // store user details  in local storage to keep user logged in between page refreshes
      //   localStorage.setItem('currentUser', JSON.stringify(user));
      // }
    // });
  }

  public logOut(user: User) {
    // remove user from local storage to log user out
    return this.http.post(AppComponent.API_URL+"logout", user); 
      //remove the logic from here  
      // .subscribe((response: Response) => {
      //     localStorage.removeItem('currentUser');
      // });
  }

}
