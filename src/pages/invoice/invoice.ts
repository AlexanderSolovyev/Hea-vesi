import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the InvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {
  invoices=[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthProvider
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
    this.refresh();

  }
  refresh(){
    return this.auth.loadToken().
      then((token)=> this.auth.getInvoices(token)
        .subscribe(
          (data) => this.invoices=data
        ));
  }

}
