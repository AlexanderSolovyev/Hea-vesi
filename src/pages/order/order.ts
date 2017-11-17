import {Component, OnInit} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {OkPage} from "../ok/ok";
import {StorageService} from "../storage.service";

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
              private alertCtrl: AlertController) {
  }
  order ={
    bottles: 2 ,
    returnedBottles: 2,
    deliveryDate: '',
    deliveryTime: '',
    deliveryAddress: '',
    information: ''
  };
  data ={
    firm: '',
    name: '',
    phone: '',
    email: '',
    vitenumber: '',
    deliveryAddresses: []
  };
  ngOnInit(){
    this.order=this.storageservice.order;
    this.data=this.storageservice.data;
  }

  goToOk(){
    console.log(this.data,this.order);
    this.storageservice.sendOrder()
      .subscribe(json => {
          console.log(json);
          this.navCtrl.push(OkPage);
    },
        err => {
          this.errorAlert();
        }
        );

  }
  decReturnedBottle(){
    if (this.order.returnedBottles > 0) {
      this.order.returnedBottles = this.order.returnedBottles - 1;
    };
  }
  incReturnedBottle() {
    this.order.returnedBottles = this.order.returnedBottles + 1;
  };

  errorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Server error',
      subTitle: 'Server not available. Theremay be an internet connection problem. Please try later.',
      buttons: ['Ok']
    });
    alert.present();
  }

}
