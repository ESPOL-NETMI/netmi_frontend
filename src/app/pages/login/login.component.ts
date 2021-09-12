import { Component, OnInit, OnDestroy} from '@angular/core';
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

  async check(){
    var output = await this.service.singIn(this.username, this.password);
    if(output == true){
      this.router.navigate(['/dashboard']);
    }else{
      this.invalidCredentialMsg ='Invalid username or password';
    }
  }

}
