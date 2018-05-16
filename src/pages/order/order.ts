import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {OkPage} from "../ok/ok";
import {StorageService} from "../storage.service";
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage implements OnInit{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storageservice: StorageService,
              private alertCtrl: AlertController,
              public auth: AuthProvider,
              public loadingCtrl: LoadingController) {
  }
  deliveryTimes = [
    "9:00 - 17:00",
    "9:00 - 13:00",
    "13:00 - 17:00",
    "17:00 - 20:00"
  ];

  order ={
    bottles: 2 ,
    returnedBottles: 2,
    deliveryDate: '',
    deliveryTime: '',
    deliveryAddress: '',
    information: ''
  };
  data ={
    reg_number: '',
    name: '',
    phone: '',
    email: '',
  };
  invoice = 'tellin';
  deliveryTime = this.deliveryTimes[0];
  minDate=this.calculateTomorrow();
  deliveryDate=this.minDate;
  goods = [];
  order_goods= [];

  calculateTomorrow() {
    let d = new Date();
    let nd = new Date(d.setDate(d.getDate()+1));
    return nd.toISOString();
  }

  ngOnInit(){
    this.order=this.storageservice.order;
    this.data=this.storageservice.data;
    this.goods=this.storageservice.goods;
    this.order_goods = this.goods.filter((good) =>(good.quantity>0));
    this.order.deliveryDate=this.minDate;
    console.log(this.order_goods);
  }

  sendUserOrder1() {
    this.errorAlert("Пока не работает")
  }


  sendUserOrder() {
    const info = {
      bottles: this.storageservice.order.bottles,
      returned_bottles: this.storageservice.order.returnedBottles,
      delivery_address: this.storageservice.order.deliveryAddress,
      delivery_date: (this.storageservice.order.deliveryDate).split('.')[0],
      delivery_time: this.storageservice.order.deliveryTime,
      information: this.storageservice.order.information,
      goods: this.order_goods
    };
    this.storageservice.saveOrder();

    this.auth.loadToken()
      .then((token) => {
        if (token) {
          let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Sending ...'
          });
          loading.present();
          console.log(info);
          this.auth.send(info,token)
            .subscribe(
              (res) => {
                loading.dismiss();
                this.navCtrl.push(OkPage);
                console.log(res);
            },
              (err) => {
                loading.dismiss();
                console.log(err);
                this.errorAlert("Please try again later")
                }
                //else (this.getUserdata())
              )
        }
        else {
          console.log('no token')
        }
      })
    }

  decReturnedBottle(){
    if (this.order.returnedBottles > 0) {
      this.order.returnedBottles = this.order.returnedBottles - 1;
    };
  }

  incReturnedBottle() {
    this.order.returnedBottles = this.order.returnedBottles + 1;
  };

  errorAlert(err) {
    console.log(err);
    let alert = this.alertCtrl.create({
      title: 'Server error',
      subTitle: err,
      buttons: ['Ok']
    });
    alert.present();
  }

  ionViewWillEnter(){
  }

}
