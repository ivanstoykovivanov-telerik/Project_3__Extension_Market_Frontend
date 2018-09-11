import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../authentication/register/register.component';
import { LoginComponent } from '../authentication/login/login.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { AdminComponent } from '../admin/admin.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductsOfUserComponent } from '../products-of-user/products-of-user.component';
import { ProfileDataComponent } from '../profile-data/profile-data.component';
import { UploadProductComponent } from '../upload-product/upload-product.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from '../admin-products/admin-products.component';
import { AdminFeaturedComponent } from '../admin-featured/admin-featured.component';
import { AuthGuardGuard } from '../guards/auth-guard.guard';
import { AdminAuthGuardGuard } from '../guards/admin-auth-guard.guard';


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

  //************* */
  //USER SECTION 
  //************* */
  

  {
    path  : "profile", 
    component : ProfileComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path  : "profileProducts", 
        component : ProductsOfUserComponent,
        //canActivate: [AuthGuardGuard],
        outlet: "profileDetails"
      },
      {
        path  : "uploadlProduct", 
        component : UploadProductComponent,
        //canActivate: [AuthGuardGuard],
        outlet: "profileDetails"
      },
      {
        path  : "profileData", 
        component : ProfileDataComponent,
        // canActivate: [AuthGuardGuard],
        outlet: "profileDetails"
      }]
  }, 
  {
    path  : "productDetails", 
    component : ProductDetailsComponent,
  },

  //************* */
  //ADMIN SECTION 
  //************* */
  
  {
    path  : "admin", 
    component : AdminDashboardComponent,
    // canActivate: [AuthGuardGuard, AdminAuthGuardGuard],
    canActivate: [AdminAuthGuardGuard],
    children: [
      {
        path  : "adminUsers", 
        component : AdminComponent,
        // canActivate: [AuthGuardGuard, AdminAuthGuardGuard],
        outlet: "adminSection"
      },
      {
        path  : "adminProducts", 
        component : AdminProductsComponent,
        // canActivate: [AuthGuardGuard, AdminAuthGuardGuard],
        outlet: "adminSection"
      },
      {
        path  : "adminFeatured", 
        component : AdminFeaturedComponent,
        // canActivate: [AuthGuardGuard, AdminAuthGuardGuard],
        outlet: "adminSection"
      },

    ]

    // component : AdminComponent,
    // canActivate: [AuthGuard]
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
