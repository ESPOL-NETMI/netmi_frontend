import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackService} from '../service/back.service'
import { DeviceService} from '../service/device.service'

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
  public device2: Device = new Device();
  constructor(private deviceService: DeviceService, private backService: BackService) { }

  ngOnInit() {
    this.getDevices();
    this.device1 = undefined;
    this.device2 = undefined;
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
    console.log(<Device> deviceForm.value.device1);
    console.log(<Device> deviceForm.value.device2 );
    this.backService.setConfig(this.device1,this.device2).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
    console.log("settings")
  }

}
