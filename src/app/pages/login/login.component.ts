import { Component, OnInit, OnDestroy } from '@angular/core';
//import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit, OnDestroy {
  public invalidCredentialMsg: string;
  public username:string;
  public password:string;

  constructor(
    private service : AuthService ,
    private router: Router,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  check(){
    var output = this.service.login(this.username, this.password);
    console.log(output);
    console.log(this.username);
    console.log(this.password);
    if(output == true){
      this.router.navigate(['/dashboard']);
    }else{
      this.invalidCredentialMsg ='Invalid username or password';
    }
  }

}