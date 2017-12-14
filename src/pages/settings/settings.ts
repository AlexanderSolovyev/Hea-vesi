import {Component, OnInit, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams} from 'ionic-angular';
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

  @ViewChild(Navbar) navBar: Navbar;

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
    city: string = 'Tallinn ja Harjumaa';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storageservice: StorageService) {
  }
  ngOnInit() {
    this.data = this.storageservice.data;
  }


   addAddress(form1: NgForm) {
     this.storageservice.data.deliveryAddresses.push(this.ulitsa +', '+ this.city);
     this.ulitsa='';
     this.city='Tallinn ja Harjumaa';
   }
   decAddress (index) {
     this.data.deliveryAddresses.splice(index, 1)
   }

  ionViewDidLoad() {
    this.setBackButtonAction();
  }

  setBackButtonAction(){
    this.navBar.backButtonClick = () => {
      this.storageservice.saveData();
      this.storageservice.order.deliveryAddress = this.storageservice.data.deliveryAddresses[0];
      this.navCtrl.pop()
    }
  }

}
