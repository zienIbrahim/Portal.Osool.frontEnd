import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';



@Injectable({
   providedIn: 'root'
})


export class AuthGuard implements CanActivate {

   constructor(private authService: AuthService, private router: Router) { }

   canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.authService.getIsLoggedIn().value ) {
         
         return true; 
      
      }
      if (this.authService.getDecodedToken().exp ) {
         
         return true; 
      
      }
      this.router.navigate(['auth/login']);
      return false;
   }

}
