import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OrderPage} from "../order/order";
import {SettingsPage} from "../settings/settings";
import {StorageService} from "../storage.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  order = {
    bottles: 2 ,
    returnedBottles: 2,
    deliveryDate: '',
    deliveryTime: '',
    deliveryAddress: '',
    information: ''
  };
  data= {
    firm: '',
    name: '',
    phone: '',
    email: '',
    vitenumber: '',
    deliveryAddresses: []
  };

  deliveryTimes = [
    "9:00 - 17:00",
    "9:00 - 13:00",
    "13:00 - 17:00",
    "17:00 - 20:00"
  ];


  //deliveryAddresses = [
  //  "Liikury 20-25, Tallinn",
  //  "also address"
  //];
  deliveryTime = this.deliveryTimes[0];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storageservice: StorageService) {

  }
  ngOnInit(){
    this.storageservice.loadOrder();
    this.storageservice.loadData()
      .then(
        data => this.storageservice.data=data,
        error => this.navCtrl.push(SettingsPage)
      );
    this.order=this.storageservice.order;
    this.order.deliveryDate=this.deliveryDate;
    this.data = this.storageservice.data;
    console.log(this.data);
    this.storageservice.order.deliveryAddress = this.storageservice.data.deliveryAddresses[0];
  }
  goToOrder() {
    this.storageservice.saveOrder();
    this.storageservice.order.returnedBottles=this.storageservice.order.bottles;
    this.navCtrl.push(OrderPage);


  }
  GoToSettings() {
    this.navCtrl.push(SettingsPage)
  }
  minDate=this.calculateTomorrow();
  deliveryDate=this.minDate;

  calculateTomorrow() {
    let d = new Date();
    let nd = new Date(d.setDate(d.getDate()+1));
    return nd.toISOString();
  }
  decBottle(){
    if (this.order.bottles > 2) {
      this.storageservice.order.bottles= this.storageservice.order.bottles-1;
    };
  }
  incBottle(){
    this.storageservice.order.bottles= this.storageservice.order.bottles+1;
    };
}

