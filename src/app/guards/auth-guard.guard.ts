import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  
  constructor(
    private router: Router, 
    private userService: UserService,
    private jwt: JwtHelperService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      let myRawToken = tokenGetter(); 
      
      const decodedToken = this.jwt.decodeToken(myRawToken);
      const expirationDate = this.jwt.getTokenExpirationDate(myRawToken);
      const isExpired = this.jwt.isTokenExpired(myRawToken);

      if ( this.jwt.isTokenExpired(myRawToken)) {
        this.router.navigate(['login'], {queryParams: {redirectTo: state.url}});
        return false;
      } else {
        return true;
      }
  }
}
