import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
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
//  data: {
//    name: string,
//    phone: string,
//    email: string,
//  } = this.storageservice.data
  //deliveryAdresses: string[]= this.storageservice.deliveryAddresses;
  deliveryTimes = [
    "9:00 - 17:00",
    "9:00 - 13:00",
    "13:00 - 17:00",
    "17:00 - 20:00"
  ];

  token: {auth_token: string};

  //deliveryAddresses = [
  //  "Liikury 20-25, Tallinn",
  //  "also address"
  //];
  deliveryTime = this.deliveryTimes[0];


  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              private storageservice: StorageService,
              public loadingCtrl: LoadingController,
              public plt: Platform) {
    this.plt.ready().then (() => {
      this.loadInitial();
    //  this.getUserdata();
    })

  }
  ngOnInit() {}

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

  loadInitial(){
    this.storageservice.loadOrder();
    this.storageservice.loadAddresses()
      .then(
        data => {
          console.log(data);
          this.storageservice.deliveryAddresses=data;
          this.order.deliveryAddress = this.storageservice.deliveryAddresses[0];
        },
        error => {console.log(error)})
        .then(
          data => {
            if (this.storageservice.deliveryAddresses.length < 1){ this.navCtrl.push(SettingsPage)}
            else { this.order.deliveryAddress = this.storageservice.deliveryAddresses[0]; }
          });

    this.order=this.storageservice.order;
    this.order.deliveryDate=this.deliveryDate;
  }

  ionViewWillEnter(){

  }


    errorAlert(err) {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Server error',
        subTitle: err,
        buttons: ['Try again']
      });
      alert.present();
    }

}
