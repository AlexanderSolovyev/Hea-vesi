import {Component, OnInit} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {OkPage} from "../ok/ok";
import {StorageService} from "../storage.service";
import {HttpErrorResponse} from "@angular/common/http";

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

  active: boolean=false;

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
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
          };
          this.errorAlert(err);

        });

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
    this.active=false
  }
  animGo() {
    this.active = true;
    setTimeout(() => {
      this.goToOk();
      this.active=false;
    }, 2750);
  }
}
