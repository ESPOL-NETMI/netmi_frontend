import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackService} from '../service/back.service'
import { DeviceService} from '../service/device.service'
import { saveAs } from 'file-saver';

import { Device} from '../../modal/device'

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  providers: [DeviceService, BackService]
})
export class DevicesComponent implements OnInit {
  public devices: Device[];
  public device1: Device = new Device();
  public method: String;
  public methods;
  constructor(private deviceService: DeviceService, private backService: BackService) { }

  ngOnInit() {
    this.getDevices();
    this.device1 = undefined;
    this.method = undefined;
    this.methods = [{label:"VRF FROM CISCO IOS - IOSXE TO CISCO IOSXR", value:1},
    {label:"MP BGP VRF FROM CISCO IOS - IOSXE TO CISCO IOSXR",value:2},
    {label:"ACL FROM CISCO IOS - IOSXE TO CISCO IOSXR",value:3}]
  }

  getDevices(){
    this.deviceService.getDevices()
      .snapshotChanges().subscribe(item => {
        this.devices = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.devices.push(x as Device);
        });
      });
  }

  getConfiguration(deviceForm: NgForm)
  {

    this.backService.setConfig(this.device1,this.method).subscribe(resp => {
      const keys = resp.headers;
      const blob: any = new Blob([resp.body], { type: keys.getAll("content-type").toString() });
      const file = new File([blob], "config" + '.cfg', { type: keys.getAll("content-type").toString() });
      saveAs(file);
    }, err => {
      console.log(err);
    });
  }

}
