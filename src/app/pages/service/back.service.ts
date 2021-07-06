import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Cliente } from 'src/app/interfaces/cliente';
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

  setConfig(device: Device,device2: Device): Observable<HttpResponse<any>> {
    this.cabeceraReq = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let ruta = "setdevice";
    let cuerpoReq: any = {
      "ip1": device.ip,
      "port1": device.port,
      "os1": device.os,
      "username1": device.username,
      "password1": device.password,
      "secret1": device.epassword,
      "ip2": device2.ip,
      "port2": device.port,
      "os2": device2.os,
      "username2": device2.username,
      "password2": device2.password,
      "secret2": device2.epassword
    };

    return this.http.post<any>(global.ruta + ruta, cuerpoReq, { headers: this.cabeceraReq, observe: 'response' });
  }


}
