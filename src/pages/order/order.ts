import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
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
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
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
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.storageservice.sendOrder()
      .subscribe(
        json => {
          console.log(json);
          loading.dismiss();
          this.navCtrl.push(OkPage);
    },
        err => {
          loading.dismiss();
          this.errorAlert("Please try again later")}


      )};
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
    }, 2050);
  }
}
