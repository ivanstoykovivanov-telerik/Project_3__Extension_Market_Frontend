import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FeaturedComponent } from './featured/featured.component';
import { PopularComponent } from './popular/popular.component';
import { NewComponent } from './new/new.component';
import { LoginComponent } from './admission/login/login.component';
import { RegisterComponent } from './admission/register/register.component';
import { LogoutComponent } from './admission/logout/logout.component';
import { ProductComponent } from './product/product.component';

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
    ProductComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
