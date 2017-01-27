import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  query:string;
  htmlResult:string;
  data:any;

  constructor(public navCtrl: NavController, public http: Http) {
    this.data = {};
  }



  search() {
    var body = 'queryString=' + this.query;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http
      .post('https://howlongtobeat.com/search_main.php?page=1',
        body, {
          headers: headers
        })
        .subscribe(data => {
          this.htmlResult = data["_body"];
        });


  }

}
