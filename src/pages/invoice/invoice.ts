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
  tellimused=[];
  arved=[];
  invoicelist="tellimused"

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthProvider
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
    this.tellimused_refresh();
    this.arved_refresh();
  }
  tellimused_refresh(){
    return this.auth.loadToken().
      then((token)=> this.auth.getInvoices(token)
        .subscribe(
          (data) => this.tellimused=data
        ));
  }

  arved_refresh(){
    return this.auth.loadToken().
      then((token)=> this.auth.getArved(token)
        .subscribe(
          (data) => this.arved=data
        ));
  }

  doRefresh(refresher){
    this.tellimused_refresh()
    .then(()=> this.arved_refresh()
    .then(()=> refresher.complete())
  );
  }
}
