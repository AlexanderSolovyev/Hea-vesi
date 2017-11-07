import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, NgForm} from "@angular/forms";

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
export class SettingsPage  {
  name: string = "Alexander";
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  saveProfile() {
    console.log('submit')
  }
  submitForm(form: NgForm){
    console.log('submitted',form)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
}
