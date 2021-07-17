import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from 'src/app/modal/device'
import * as global from "src/app/global";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class BackService {

  private cabeceraReq: any;
  constructor(private http: HttpClient) {
    this.cabeceraReq = new HttpHeaders({
      'Content-Type': 'application/json',
    });
   }

  setConfig(device: Device, m:any): Observable<HttpResponse<Blob>> {
    this.cabeceraReq = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let ruta = "";
    switch(m) {
      case 1: {
        ruta = "getvrfconfig";
         break;
      }case 2: {
        ruta = "getmpbgpvrfconfig";
         break;
      }case 3: {
        ruta = "getaclconfig";
         break;
      }default: {
         ruta = "getvrfconfig";
         break;
      }
    }
    let cuerpoReq: any = {
      "name": device.name
    };

    return this.http.post(global.ruta + ruta, cuerpoReq, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob'});
  }

  insertDevice(device: Device): Observable<HttpResponse<any>> {
    this.cabeceraReq = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let ruta = "addtoyaml";
    let cuerpoReq: any = {
      "name": device.name,
      "os": device.os,
      "ip": device.ip,
      "username":device.username,
      "password":device.password,
      "epassword":device.epassword
    };
    return this.http.post<any>(global.ruta + ruta, cuerpoReq, { headers: this.cabeceraReq, observe: 'response'});

  }

}
