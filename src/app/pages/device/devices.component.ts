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
  public method: any;
  public username: String;
  public password: String;
  public epassword: String;
  public port: Number;
  public methods;
  public mios;
  public methodios;
  public alert: any;
  public alertstatus:boolean=true;
  constructor(private deviceService: DeviceService, private backService: BackService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getDevices();
    this.device1 = undefined;
    this.method = [{label:"", devices:[{label:"", value:0}]}];;
    this.mios = null
    this.methodios = null
    this.username = "";
    this.password = "";
    this.epassword = "";
    this.port = 0;
    this.alert={type:"warning",message:"You should check device information"};

  this.methods = [{label:"VRF", devices:[{label:"CISCO IOS - IOSXE  TO   CISCO IOSXR", value:1},{label:"CISCO IOS - IOSXE  TO   HUAWEI AR", value:2}]},
    {label:"MP BGP VRF", devices:[{label:"CISCO IOS - IOSXE  TO   CISCO IOSXR", value:3},{label:"CISCO IOS - IOSXE  TO   HUAWEI AR", value:4}]},
    {label:"ACL", devices:[{label:"CISCO IOS - IOSXE  TO   CISCO IOSXR", value:5},{label:"CISCO IOS - IOSXE  TO   HUAWEI AR", value:6}]},
    {label:"PREFIX LIST", devices:[{label:"CISCO IOS - IOSXE  TO   CISCO IOSXR", value:7},{label:"CISCO IOS - IOSXE  TO   HUAWEI AR", value:8}]},
    {label:"ROUTER MAP", devices:[{label:"CISCO IOS - IOSXE  TO   CISCO IOSXR", value:9},{label:"CISCO IOS - IOSXE  TO   HUAWEI AR", value:10}]},
    {label:"INTERFACES", devices:[{label:"CISCO IOS - IOSXE  TO   CISCO IOSXR", value:11},{label:"CISCO IOS - IOSXE  TO   HUAWEI AR", value:12}]},
    {label:"BRIDGE DOMAIN", devices:[{label:"CISCO IOS - IOSXE  TO   CISCO IOSXR", value:13},
    {label:"STATIC ROUTING", devices:[{label:"CISCO IOS - IOSXE  TO   CISCO IOSXR", value:14}]},
  ]}
  ]

  }

  onChange(m) {
    this.methodios=m;
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
    this.backService.setConfig(this.device1,this.mios,this.username,this.password,this.epassword,this.port).subscribe(resp => {
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
