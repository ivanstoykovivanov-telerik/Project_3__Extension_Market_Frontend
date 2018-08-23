import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient
  ) { }


  public getAllUsers(){
      return this.http.get<User[]>(AppComponent.API_URL + '/account' ); 
  }


}

