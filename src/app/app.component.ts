import { Component } from '@angular/core';
//import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'argon-dashboard-angular';
  constructor (//private authService:AuthService,
    private router:Router) {
  }
  logout() {
   // this.authService.logoutUser();
   // this.router.navigate(['home']);
  }
}
