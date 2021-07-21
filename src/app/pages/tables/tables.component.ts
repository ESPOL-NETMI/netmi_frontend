import { Component, OnInit } from '@angular/core';
import { DeviceService} from '../service/device.service'
import { BackService} from '../service/back.service'
import { Device} from '../../modal/device'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  providers: [DeviceService,BackService]
})
export class TablesComponent implements OnInit {
  public devices: Device[];
  closeResult = '';
  public protocolos;
  constructor(private modalService: NgbModal,
    private deviceService: DeviceService, private backService:  BackService
    ) {}

  ngOnInit() {
    //this.deviceService.getDevices().then(data => this.devices = data);
    this.resetForm();
    this.getDevices();
    this.protocolos = [{label:"ssh", value:"ssh"},
    {label:"telenet",value:"telnet"}]

  }

  show(){
    //console.log(this.deviceService.getDevices());
  }

  open(content) {
    //console.log(content);
    /*if(device.$key != null){
      this.onEdit(device);
    }*/
    this.modalService.open(content).result.then((result) => {
      this.resetForm();
    }, (reason) => {
      this.resetForm();
    });
  }
  openEdit(content,device) {
    //console.log(device);
    if(device.$key != null){
      this.onEdit(device);
    }
    this.modalService.open(content).result.then((result) => {
      this.resetForm();
    }, (reason) => {
      this.resetForm();
    });
  }

  onSubmit(deviceForm: NgForm)
  {
    if(deviceForm.value.$key == null){
      this.deviceService.insertDevice(deviceForm.value);
    }else{
      this.deviceService.updateDevice(deviceForm.value);
    }
    this.resetForm(deviceForm);
    this.modalService.dismissAll();
    this.getDevices();
  }

  resetForm(deviceForm?: NgForm)
  {
    if(deviceForm != null)
    deviceForm.reset();
      this.deviceService.selectedDevice = new Device();
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

  onEdit(device: Device) {
    this.deviceService.selectedDevice = Object.assign({}, device);
  }

  onDelete($key: string) {
    if(confirm('Are you sure you want to delete it?')) {
      this.deviceService.deleteDevice($key);
      this.getDevices();
    }
  }

}
