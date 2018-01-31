import { Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {NativeStorage} from "@ionic-native/native-storage";

@Injectable()

export class StorageService {
  constructor(private  http: Http,
              private nativeStorage: NativeStorage,
            ) {}

  data: {
    reg_number: string,
    name: string,
    phone: string,
    email: string
  }={
    reg_number: '',
    name: '',
    phone: '',
    email: ''
  };
  order = {
    bottles: 2,
    returnedBottles: 2,
    deliveryDate: '',
    deliveryTime: '9:00 - 17:00',
    deliveryAddress: '',
    information: ''
  };

  deliveryAddresses: any=[];

  saveOrder(){
    this.nativeStorage.setItem('order',
      {
        bottles: this.order.bottles
      }).then(
      () =>console.log('order Stored'),
      error => console.error(' order error',error)
    );

  };
  saveAddresses(){
    this.nativeStorage.setItem('deliveryAdresses', this.deliveryAddresses)
      .then(
        () =>console.log('deliveryAdresses Stored'),
        error => console.error(' deliveryAdresses error',error)
      );
  };
  loadOrder(){
    this.nativeStorage.getItem('order')
      .then(
        data =>
          this.order.bottles=data.bottles,
       error => this.order.bottles=2
      );
  };

  loadAddresses(){
    return this.nativeStorage.getItem('deliveryAdresses')

  };
  sendOrder(){
    const info = {
      reg_number: this.data.reg_number,
      name: this.data.name,
      phone: this.data.phone,
      email: this.data.email,
      delivery_address: this.order.deliveryAddress,
      delivery_date: (this.order.deliveryDate).split('.')[0],
      delivery_time: this.order.deliveryTime,
      bottles: this.order.bottles,
      returned_bottles: this.order.returnedBottles,
      information: this.order.information

    };
    console.log(info);
    //let username: string = 'exch';
    //let password: string = '13572468';
    let headers: Headers = new Headers();
    //headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    //headers.append("Content-Type", "application/x-www-form-urlencoded");
    //headers.append("Authorization", "Basic ZXhjaDoxMzU3MjQ2OA=="
    // headers.append( "Access-Control-Allow-Origin", "*");
    return this.http.post('https://212.7.4.74:8443/order/create', info,{headers: headers})
    //return this.http.post('https://fathomless-ridge-64107.herokuapp.com/order/create',info,{headers: headers})
    //return this.http.post('http://80.235.24.138:88/order/create',info,{headers: headers})
  };


}
