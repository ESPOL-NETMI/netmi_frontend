import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router} from '@angular/router';
//import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

      if(localStorage.getItem('username')!== null && localStorage.getItem('username')!=="undefined" ){
        //this.router.navigate(['/login']);
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }

}
