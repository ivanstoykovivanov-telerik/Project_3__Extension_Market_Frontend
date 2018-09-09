import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    public http: HttpClient
  ) { }



  public getAllUsers(){
    return this.http.get<User[]>(AppComponent.API_URL + '/admin/users/listAll' );
  }


  public disableUser(user: User){
    return this.http.post(`${AppComponent.API_URL}/admin/users/disableUser/${user.id}`, {}); 
  }

  public enableUser(user: User){
    return this.http.post(`${AppComponent.API_URL}/admin/users/enableUser/${user.id}`, {}); 
  } 

}