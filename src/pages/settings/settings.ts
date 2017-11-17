import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, NgForm} from "@angular/forms";
import { StorageService } from '../storage.service'

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {
  form: FormGroup;
  data = {
    firm: '',
    name: '',
    phone: '',
    email: '',
    vitenumber: '',
    deliveryAddresses: []
};
    ulitsa: string;
    city: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storageservice: StorageService) {
  }
  ngOnInit() {
    this.data = this.storageservice.data;
  }

  saveProfile(form: NgForm){
    this.storageservice.saveData();

  }

   addAddress(form1: NgForm) {
     this.storageservice.data.deliveryAddresses.push(this.ulitsa +', '+ this.city);
    console.log(form1);
   }
   decAddress (index) {
    console.log('click');
    this.data.deliveryAddresses.splice(index,1)
   }
}
