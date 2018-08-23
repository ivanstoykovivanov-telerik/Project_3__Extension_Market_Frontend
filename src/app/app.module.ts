import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';

//Components:
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FeaturedComponent } from './featured/featured.component';
import { PopularComponent } from './popular/popular.component';
import { NewComponent } from './new/new.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';

// Bootstrap modules: 
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './services/auth.service';
import { AccountService } from './services/account.service';
import { ProductService } from './services/product.service';
import { AuthGuard } from '../guards/auth.guard';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeaturedComponent,
    PopularComponent,
    NewComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ProductComponent,
    NavbarComponent,
    ProfileComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule, 
    RoutingModule, 
    BsDropdownModule.forRoot(),
    AngularFontAwesomeModule, 
    CollapseModule.forRoot()
  ],
  providers: [
    AuthService,
    AccountService, 
    ProductService, 
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
