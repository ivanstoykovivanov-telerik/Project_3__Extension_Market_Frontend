import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../authentication/register/register.component';
import { LoginComponent } from '../authentication/login/login.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuard } from '../../guards/auth.guard';
import { AdminComponent } from '../admin/admin.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductsOfUserComponent } from '../products-of-user/products-of-user.component';
import { ProfileDataComponent } from '../profile-data/profile-data.component';
import { UploadProductComponent } from '../upload-product/upload-product.component';

const routes: Routes = [
  {
    path  : "register", 
    component : RegisterComponent
  }, 
  {
    path  : "login", 
    component : LoginComponent, 
  },
  {
    path  : "logout", 
    component : LoginComponent,
  },
  {
    path  : "home", 
    component : HomeComponent,
  }, 
  {
    path  : "profile", 
    component : ProfileComponent,
    children: [
      {
        path  : "profileProducts", 
        component : ProductsOfUserComponent,
        outlet: "profileDetails"
      },
      {
        path  : "uploadlProduct", 
        component : UploadProductComponent,
        outlet: "profileDetails"
      },
      {
        path  : "profileData", 
        component : ProfileDataComponent,
        outlet: "profileDetails"
      }]
  }, 
  {
    path  : "productDetails", 
    component : ProductDetailsComponent,
  },
  {
    path  : "admin", 
    component : AdminComponent,
    canActivate: [AuthGuard]
  }, 
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
