import { NgModule, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
//import { runInThisContext } from 'vm';
@Injectable()
export class AuthService {

    private isloggedIn: boolean;
    private userName:string;
    private passWord:string;

    emailRegex = /^\w+[\.-]?\w+@\w+[\.-]?\w+\.\w{2,3}$/;

    constructor(
      public afAuth: AngularFireAuth
    ) {}

    login(username: string, password:string) {
        this.userName=username;
        this.passWord=password;
        this.isloggedIn=this.isAdminUser();
        return this.isloggedIn;

    }


    isUserLoggedIn(): boolean {
        return this.isloggedIn;
    }

    private isAdminUser():boolean {
        if (this.userName==="Admin" && this.passWord==="Admin123") {
            localStorage.setItem("username","admin");
            return true;
        }else{
          return false;
        }
    }

    logout(): void{
      localStorage.removeItem("username");
        this.isloggedIn = false;
    }

    async singIn(username: string, password:string) {
      const email = username;

      await this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res =>{
        localStorage.setItem("username",username);
      }).catch((error) => {
        localStorage.removeItem("username");
        return false;
      });
      return true;
    }

}
