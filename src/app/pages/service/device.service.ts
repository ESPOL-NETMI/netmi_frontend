import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device} from './device'

@Injectable()
export class DeviceService {

    constructor(private http: HttpClient) { }

    getDevices() {
    return this.http.get<any>('assets/data/devices.json')
      .toPromise()
      .then(res => res.data as Device[])
      .then(data => data);
    }
}
