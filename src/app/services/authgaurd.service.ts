import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService {

   constructor(private auth: AuthenticationService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.auth.currentUser$.pipe
      (map( user =>{
          if(user){
            return true;
          }

          this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
          return false;
        })
      )

  }
}
