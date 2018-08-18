import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../authentication/register/register.component';
import { LoginComponent } from '../authentication/login/login.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  {path  : "register", component : RegisterComponent}, 
  {path  : "login" , component : LoginComponent},
  {path  : "logout" , component : LoginComponent},
  {path  : "home" , component : HomeComponent}, 
  {path  : "profile" , component : ProfileComponent}, 
  // otherwise redirect to home
  // { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ 
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
