import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm} from "@angular/forms";
import { StorageService } from '../storage.service';


/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  ulitsa: string;
  city: string = 'Tallinn ja Harjumaa';
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private storageservice: StorageService

   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }

  addAddress(form1: NgForm) {
    this.storageservice.deliveryAddresses.push(this.ulitsa +', '+ this.city);
    this.storageservice.saveAddresses();
    this.storageservice.order.deliveryAddress = this.storageservice.deliveryAddresses[0];
    this.ulitsa='';
    this.city='Tallinn ja Harjumaa';
  }
  decAddress (index) {
    this.storageservice.deliveryAddresses.splice(index, 1);
    this.storageservice.saveAddresses();
  }

}
