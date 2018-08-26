import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';

//Components:
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FeaturedComponent } from './featured/featured.component';
import { PopularComponent } from './popular/popular.component';
import { NewComponent } from './new/new.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { ListOfProductsComponent } from './profile/list-of-products/list-of-products.component';
import { TestComponent } from './test/test.component';
import { ProductComponent } from './product/product.component';

// Bootstrap modules: 
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxCarouselModule } from 'ngx-carousel';

//Services: 
import { AuthService } from './services/auth.service';
import { AccountService } from './services/account.service';
import { ProductService } from './services/product.service';
import { AuthGuard } from '../guards/auth.guard';
import { CarouselComponent } from './carousel/carousel.component';

//Security
import { JwtModule } from '@auth0/angular-jwt';
import { ProductDetailsComponent } from './product-details/product-details.component';

// export function tokenGetter() {
//   return localStorage.getItem('access_token');
// }



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
    NavbarComponent,
    ProfileComponent,
    AdminComponent,
    ListOfProductsComponent,
    TestComponent,
    ProductComponent,
    CarouselComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule, 
    RoutingModule, 
    NgxCarouselModule, 
    BsDropdownModule.forRoot(),
    AngularFontAwesomeModule, 
    CollapseModule.forRoot(), 
    CarouselModule.forRoot(),
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     whitelistedDomains: ['localhost:8080'],
    //     blacklistedRoutes: ['localhost:3001/auth/'] //example
    //   }
    // }), 
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
