import { Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {NativeStorage} from "@ionic-native/native-storage";

@Injectable()

export class StorageService {
  constructor(private  http: Http,
              private nativeStorage: NativeStorage) {}

  data = {
    firm: '',
    name: '',
    phone: '',
    email: '',
    vitenumber: '',
    deliveryAddresses: ['1']
  };
  order = {
    bottles: 2,
    returnedBottles: 2,
    deliveryDate: '',
    deliveryTime: '9:00 - 17:00',
    deliveryAddress: '',
    information: ''
  };
  saveOrder(){
    this.nativeStorage.setItem('order',
      {
        bottles: this.order.bottles
      }).then(
      () =>console.log('order Stored'),
      error => console.error(' order error',error)
    );

  };
  saveData(){
    this.nativeStorage.setItem('data', this.data)
      .then(
        () =>console.log('data Stored'),
        error => console.error(' data error',error)
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

  loadData(){
    return this.nativeStorage.getItem('data')

  };
  sendOrder(){
    const info = {
      firm: this.data.firm,
      name: this.data.name,
      phone: this.data.phone,
      email: this.data.email,
      vitenumber: this.data.vitenumber,
      delivery_address: this.order.deliveryAddress,
      delivery_date: (this.order.deliveryDate).split('.')[0],
      delivery_time: this.order.deliveryTime,
      bottles: this.order.bottles,
      returned_bottles: this.order.returnedBottles,
      information: this.order.information

    };
    console.log(info);
    let username: string = 'exch';
    let password: string = '13572468';
    let headers: Headers = new Headers();
    //headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    //headers.append("Content-Type", "application/x-www-form-urlencoded");
    //headers.append("Authorization", "Basic ZXhjaDoxMzU3MjQ2OA=="
    // headers.append( "Access-Control-Allow-Origin", "*");
    //return this.http.post('http://212.7.4.74:8000/hv_copy/hs/PutOrder?Orders=Hello', info,{headers: headers})
    return this.http.post('http://80.235.24.138:88/order/create',info,{headers: headers})
  };


}
