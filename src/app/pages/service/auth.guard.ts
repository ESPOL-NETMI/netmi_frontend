import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router , UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      console.log("username: "+localStorage.getItem('username'));
      if(localStorage.getItem('username')!== null){
        console.log("login guard ");
        return true;
      }
      this.router.navigate(['/login']);
      console.log("no login");
      return false;
    }

}
