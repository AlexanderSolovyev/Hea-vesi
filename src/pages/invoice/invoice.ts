import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
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
     public auth: AuthProvider,
     public loadingCtrl: LoadingController,
     public plt: Platform
   ) {
     this.plt.ready().then (() => {
       this.initialLoading();
  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }
  tellimused_refresh(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: ''
    });
    loading.present();

    return this.auth.loadToken().
      then((token)=> this.auth.getInvoices(token)
        .subscribe(
          (data) => {
            this.tellimused=data;
            loading.dismiss()
          }
        )
      );
  }

  arved_refresh(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: ''
    });
    loading.present()
    return this.auth.loadToken().
      then((token)=> this.auth.getArved(token)
        .subscribe((data)=> {
        this.arved=data;
        loading.dismiss();
        //refresher.complete();
      })
      )
  }

  doRefresh(refresher){
    console.log(refresher);
    this.tellimused_refresh();
    this.arved_refresh();
      //.subscribe((data)=> {
      //  this.arved=data
    refresher.complete();
      //})
  }

  initialLoading(){
    this.tellimused_refresh();
    this.arved_refresh();
  }
}
