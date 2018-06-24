import {Component, OnInit, ViewChild} from '@angular/core';
import {Navbar, NavController, NavParams } from 'ionic-angular';
import { FormGroup, NgForm} from "@angular/forms";
import { StorageService } from '../storage.service';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

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
    reg_number: '',
    name: '',
    phone: '',
    email: ''
};
    ulitsa: string;
    city: string = 'Tallinn ja Harjumaa';
    deliveryAddresses =[]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthProvider,
              private storageservice: StorageService) {
  }
  ngOnInit() {
    this.data = this.storageservice.data;
  }


   addAddress(form1: NgForm) {
     this.storageservice.deliveryAddresses.push(this.ulitsa +', '+ this.city);
     this.storageservice.saveAddresses();
     this.storageservice.order.deliveryAddress = this.storageservice.deliveryAddresses[0];
     this.ulitsa='';
     this.city='Tallinn ja Harjumaa';
   }
   decAddress (index) {
     this.storageservice.deliveryAddresses.splice(index, 1)
   }

  ionViewDidLoad() {
    this.setBackButtonAction();
  }

  setBackButtonAction(){
    this.navBar.backButtonClick = () => {

      this.navCtrl.pop()
    }
  }

  logout() {
    this.auth.removeToken();
  //  var initialHref = window.location.href;
    this.navCtrl.setRoot(LoginPage);
//window.location.href = initialHref;
    //this.navCtrl.setRoot(LoginPage)
    //.then(() => this.navCtrl.popToRoot());
  }

}
