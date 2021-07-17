import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device} from '../../modal/device'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()
export class DeviceService {
  deviceList: AngularFireList<any>;

  selectedDevice: Device = new Device();
    constructor(private firebase: AngularFireDatabase) { }

    getDevices()
    {
      return this.deviceList = this.firebase.list('devices');
    }

    insertDevice(device: Device)
    {
      this.deviceList.push({
        name: device.name,
        os: device.os,
        ip: device.ip
      });
    }

    updateDevice(device: Device)
    {
      this.deviceList.update(device.$key, {
        name: device.name,
        os: device.os,
        ip: device.ip
      });
    }

    deleteDevice($key: string)
    {
      this.deviceList.remove($key);
    }

    /*getDevices() {
    return this.http.get<any>('assets/data/devices.json')
      .toPromise()
      .then(res => res.data as Device[])
      .then(data => data);
    }*/
}
