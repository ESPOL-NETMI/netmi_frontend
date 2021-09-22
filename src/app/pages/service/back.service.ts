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
    let show2="";
    let plantilla=""
    switch(m) {
      case 1: {
        show = "show vrf detail";
        plantilla="./plantillas/vrfdetail.j2";
        break;
      }case 2: {
        show = "show vrf detail";
        plantilla = "./plantillas/vrfdetailhuawei.j2";
        break;
      }case 3: {
        show = "show vrf detail";
        plantilla="./plantillas/mpbgpvrf.j2"
        break;
      }case 4: {
        show = "show vrf detail";
        plantilla="./plantillas/mpbgpvrfhuawei.j2"
        break;
      }case 5: {
        show = "show access-list";
        plantilla="./plantillas/accesslist.j2"
        break;
      }case 6: {
        show = "show access-list";
        plantilla="./plantillas/accesslisthuawei.j2"
        break;
      }case 7: {
        show = "show ip prefix-list detail";
        plantilla="./plantillas/prefixlist.j2";
        break;
      }case 8: {
        show = "show ip prefix-list detail";
        plantilla = "./plantillas/prefixlisthuawei.j2";
        break;
      }case 9: {
        show = "show route-map all";
        plantilla="./plantillas/routemap.j2"
        break;
      }case 10: {
        show = "show route-map all";
        plantilla="./plantillas/routemaphuawei.j2"
        break;
      }case 11: {
        ruta = "getvrfstaticroute";
        show = "show interfaces";
        show2 = "show ethernet service instance detail";
        plantilla="./plantillas/interfaces.j2"
        break;
      }case 12: {
        show = "show interfaces";
        show2 = "show ethernet service instance detail";
        plantilla="./plantillas/interfaceshuawei.j2"
        break;
      }case 13: {
        show = "show ethernet service instance detail";
        plantilla="./plantillas/bridgedomain.j2"
        break;
      }case 14: {
        show = "show interfaces";
        plantilla="./plantillas/staticroutevrf.j2"
        break;
      }case 15: {
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
      "show2":show2,
      "plantilla":plantilla
    };

    return this.http.post(global.ruta + ruta, cuerpoReq, { headers: this.cabeceraReq, observe: 'response', responseType: 'blob'});
  }

}
