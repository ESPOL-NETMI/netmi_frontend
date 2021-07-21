import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackService} from '../service/back.service'
import { DeviceService} from '../service/device.service'
import { saveAs } from 'file-saver';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Device} from '../../modal/device'
import { ThrowStmt } from '@angular/compiler';

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
  public username: String;
  public password: String;
  public epassword: String;
  public port: Number;
  public methods;
  public alert: any;
  public alertstatus:boolean=true;
  constructor(private deviceService: DeviceService, private backService: BackService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getDevices();
    this.device1 = undefined;
    this.method = undefined;
    this.username = "";
    this.password = "";
    this.epassword = "";
    this.port = 0;
    this.alert={type:"warning",message:"You should check device information"};
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

  getConfiguration(deviceForm: NgForm,content)
  {
    if (this.port==undefined){
      this.port=0;
    }
    if (this.device1==undefined ){
      this.alertstatus=false;
      return 0;
    }if (this.device1.name==undefined ){
      this.alertstatus=false;
      return 0;
    }
    if (this.method==undefined || this.method.length==0){
      this.alertstatus=false;
      return 0;
    }
    if (this.username==undefined || this.username==""){
      this.alertstatus=false;
      return 0;
    }
    if (this.password==undefined || this.password==""){
      this.alertstatus=false;
      return 0;
    }
    if (this.epassword==undefined){
      this.epassword="";
    }

    this.modalService.open(content);
    this.alertstatus=true;
    this.backService.setConfig(this.device1,this.method,this.username,this.password,this.epassword,this.port).subscribe(resp => {
      const keys = resp.headers;
      const blob: any = new Blob([resp.body], { type: keys.getAll("content-type").toString() });
      const file = new File([blob], "config" + '.cfg', { type: keys.getAll("content-type").toString() });
      saveAs(file);
      this.modalService.dismissAll();
    }, err => {
      this.alertstatus=false;
      this.modalService.dismissAll();
      //console.log(err);
    });
  }

}
