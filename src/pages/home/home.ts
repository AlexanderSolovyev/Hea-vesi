import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {OrderPage} from "../order/order";
import {SettingsPage} from "../settings/settings";
import {StorageService} from "../storage.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  active:boolean = false;

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
    // deliveryAddresses: []
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
              private storageservice: StorageService,
              public plt: Platform) {
    this.plt.ready().then (() => {
      this.loadInitial();
    })

  }
  ngOnInit(){


  }

  ionViewVDidLoad(){

  }
  goToOrder() {
    this.storageservice.saveOrder();
    this.storageservice.order.returnedBottles=this.storageservice.order.bottles;
    this.carGo();



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

  loadInitial(){
    this.storageservice.loadOrder();
    this.storageservice.loadData()
      .then(
        data => {
          this.storageservice.data=data;
          this.order.deliveryAddress = this.storageservice.data.deliveryAddresses[0];
          },
        error => this.navCtrl.push(SettingsPage)
      );
    this.order=this.storageservice.order;
    this.order.deliveryDate=this.deliveryDate;
  }
  carGo(){
    this.active=true;
    setTimeout(() =>{ this.navCtrl.push(OrderPage);}, 2100);


  };
  ionViewWillEnter(){
    this.active=false
  }
}

