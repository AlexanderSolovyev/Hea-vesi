import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {NativeStorage} from "@ionic-native/native-storage";

@Injectable()

export class StorageService {
  constructor( private nativeStorage: NativeStorage,
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

  goods= [{
    name: 'HeaVesi 19L',
    price: '4',
    image_url: '1',
    quantity: 0
  },
  {
    name: 'Lavazza Qualita Oro',
    price: '17.90',
    image_url: '2',
    quantity: 0
  }];
  water_price=''

  deliveryAddresses: any =[];

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
    this.water_price=this.goods.splice(0,1)[0].price;
    console.log(this.water_price);
    this.goods.forEach((good) => good.quantity=0);
    this.goods.forEach((good)=> {
      if (good.name.length > 17) {
        good.name=good.name.slice(0,17)+"...";
      }
    });

  };

  loadAddresses(){
    return this.nativeStorage.getItem('deliveryAdresses')
  };
  //sendOrder(token: any){

    //let username: string = 'exch';
    //let password: string = '13572468';
    //let headers: Headers = new Headers();
    //headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    //headers.append("Content-Type", "application/x-www-form-urlencoded");
    //headers.append("Authorization", "Basic ZXhjaDoxMzU3MjQ2OA=="
    // headers.append( "Access-Control-Allow-Origin", "*");
    //return this.http.post('https://212.7.4.74:8443/order/create', info,{headers: headers})
    //return this.http.post('https://fathomless-ridge-64107.herokuapp.com/order/create',info,{headers: headers})
//  };


}
