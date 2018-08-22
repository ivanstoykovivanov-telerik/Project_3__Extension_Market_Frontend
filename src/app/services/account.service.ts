import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {
  constructor(public http: HttpClient) { }

  createAccount(user: User){
    return this.http.post(AppComponent.API_URL+'/account/register',user); 
      // .subscribe(resp =>resp.json());
  }
}

