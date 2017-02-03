import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  query:string;

  constructor(public navCtrl: NavController, public http: Http) {

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
          var htmlStr = data["_body"];
          htmlStr = replaceAll(htmlStr, "gameimages/", "https://howlongtobeat.com/gameimages/");


          var el = document.createElement('html');
          el.innerHTML = htmlStr;
          var htmlData = el.getElementsByTagName('li');
          var gameList = [];

          for(var i = 0; i < htmlData.length; i++) {
            var imgUrl = htmlData[i].getElementsByTagName('img')[0].src;
            var title = htmlData[i].getElementsByTagName('a')[0].title;
            var durations = htmlData[i].getElementsByClassName('center');
            var durationData = htmlData[i].getElementsByClassName('search_list_details_block')[0].children;

            //debugger;

            var game = { durations: [] };
            game['title'] = title;
            game['imgUrl'] = imgUrl;
            for(var j = 0; j < durationData.length; j++) {
               var range = durationData[j].children[0].textContent;
               var length = durationData[j].children[1].textContent;
               game.durations.push({
                  range: range,
                  length: length
               });
            }

            gameList.push(game);
          }

          debugger;
        });
  }

}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
