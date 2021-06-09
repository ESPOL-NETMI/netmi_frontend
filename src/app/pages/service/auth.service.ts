import { NgModule, Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    private isloggedIn: boolean;
    private userName:string;
    private passWord:string;

    constructor() {
    }

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

}
