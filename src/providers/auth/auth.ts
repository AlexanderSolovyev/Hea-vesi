import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable} from "rxjs";
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient,
              private storage: Storage) {
  }

  //url='http://app.heavesi.ee:443';
  url='http://localhost:3000';
  //token ={ auth_token: ''};

  loadToken() {
    return this.storage.get('token')
  }

  removeToken(){
    this.storage.remove('token')
  }

  saveToken(token: any) {
    return this.storage.set('token', token)
  }

  //saveToken(token: any) {
//    return new Promise((resolve, reject) => this.storage.set('token', token))
//  }

  login(values: any): Observable<any> {
    return this.http.post(`${this.url}/authenticate`, values)
  }
  signup(values:any) {
    return this.http.post(`${this.url}/registration`, values)
  }

  resend(values:any) {
    return this.http.post(`${this.url}/resend`, values)
  }

  getUserdata(token: any): Observable<any> {
    let headers = new HttpHeaders()
     .set("Content-Type", "application/json")
     .set("Authorization", token);
    return this.http.get(`${this.url}/info`, {headers: headers})
  }

  getGoods(token: any): Observable<any> {
      let headers = new HttpHeaders()
       .set("Content-Type", "application/json")
       .set("Authorization", token);
      return this.http.get(`${this.url}/goods`, {headers: headers})
  }

  getInvoices(token: any): Observable<any> {
      let headers = new HttpHeaders()
       .set("Content-Type", "application/json")
       .set("Authorization", token);
      return this.http.get(`${this.url}/invoices`, {headers: headers})
  }

  getArved(token: any): Observable<any> {
      let headers = new HttpHeaders()
       .set("Content-Type", "application/json")
       .set("Authorization", token);
      return this.http.get(`${this.url}/arved`, {headers: headers})
  }

  send(info: any, token: any): Observable<any> {
    let headers = new HttpHeaders()
     .set("Content-Type", "application/json")
     .set("Authorization", token);
    return this.http.post(`${this.url}/send`, info, {headers: headers})
  }
}
