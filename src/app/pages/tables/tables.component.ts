import { Component, OnInit } from '@angular/core';
import { DeviceService} from '../service/device.service'
import { Device} from '../service/device'

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  providers: [DeviceService]
})
export class TablesComponent implements OnInit {
  public devices: Device[];

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.deviceService.getDevices().then(data => this.devices = data);
  }

  show(){
    console.log(this.devices);
  }
}
