import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  htmlResult:string;

  constructor(public navCtrl: NavController, public http: Http) {

  }


  search(ev) {
    var query = ev.target.value;
    if(query === undefined) {
      query = "";
    }
    var body = 'queryString=' + query;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http
      .post('https://howlongtobeat.com/search_main.php?page=1',
        body, {
          headers: headers
        })
        .subscribe(data => {
          this.htmlResult = data["_body"];
          this.htmlResult = replaceAll(this.htmlResult, "gameimages/", "https://howlongtobeat.com/gameimages/");
        });

        

  }

}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
