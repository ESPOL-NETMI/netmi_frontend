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

  setConfig(device: Device, m:any, u:any,p:any,ep:any,port:any): Observable<HttpResponse<Blob>> {
    this.cabeceraReq = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let ruta = "getparsingcfg";
    let show="";
    let plantilla=""
    switch(m) {
      case 1: {
        show = "show vrf detail";
        plantilla="./plantillas/vrfdetail.j2";
         break;
      }case 2: {
        show = "show vrf detail";
        plantilla = "./plantillas/mpbgpvrf.j2";
         break;
      }case 3: {
        show = "show access-list";
        plantilla="./plantillas/accesslist.j2"
         break;
      }default: {
        show = "show vrf detail";
        plantilla="./plantillas/vrfdetail.j2";
         break;
      }
    }
    let cuerpoReq: any = {
      "name": device.name,
      "username":u,
      "password":p,
      "ip":device.ip,
      "protocol":device.protocol,
      "encryp":device.encryp,
      "os":device.os,
      "port":port,
      "enable":ep,
      "show":show,
      "plantilla":plantilla
    };

    return this.http.post(global.ruta + ruta, cuerpoReq, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob'});
  }

}
