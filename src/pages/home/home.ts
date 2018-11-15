import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import {OrderPage} from "../order/order";
import {SettingsPage} from "../settings/settings";
import {StorageService} from "../storage.service";
import {AddressPage} from "../address/address";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  itemslist='tooted';
  order = {
    bottles: 2 ,
    returnedBottles: 2,
    deliveryDate: '',
    deliveryTime: '',
    deliveryAddress: '',
    information: ''
  };
  goods = [];
  water_price = '';
  token: {auth_token: string};
  rent(good){
    if (good.rent == 1){
      return true;
    }
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storageservice: StorageService,
              public loadingCtrl: LoadingController,
              public plt: Platform) {
    this.plt.ready().then (() => {
      this.loadInitial();
    })

  }
  ngOnInit() {}

  goToOrder() {
    this.storageservice.order.returnedBottles=this.storageservice.order.bottles;
    this.navCtrl.push(OrderPage);
  }

  GoToSettings() {
    this.navCtrl.push(SettingsPage)
  }

  decQuantity(good){
    if (good.quantity > 0) {
      good.quantity= good.quantity-1;
    };
  }

  incQuantity(good){
    good.quantity= good.quantity+1;
  };

  decBottles(){
    if (this.order.bottles > 0) {
      this.order.bottles= this.order.bottles-1;
    };
  }

  incBottles(){
  this.order.bottles= this.order.bottles+1;
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
            if (this.storageservice.deliveryAddresses.length < 1){ this.navCtrl.push(AddressPage)}
            else { this.order.deliveryAddress = this.storageservice.deliveryAddresses[0]; }
          });

    this.order=this.storageservice.order;
    this.goods=this.storageservice.goods;
    this.water_price = this.storageservice.water_price;
    console.log(this.goods);
  }

  ionViewWillEnter(){

  }

}
