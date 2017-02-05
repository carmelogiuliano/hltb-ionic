import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  root:Element;
  gameList:any[];
  totalResults:string;

  constructor(public navCtrl: NavController, public http: Http) {
     this.gameList = [];
  }

  search(ev) {
    this.gameList = [];
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
          var htmlStr = data["_body"];
          htmlStr = replaceAll(htmlStr, "gameimages/", "https://howlongtobeat.com/gameimages/");
          this.root = document.createElement('html');
          this.root.innerHTML = htmlStr;

          var totalResultsStr = this.root.getElementsByTagName('h3')[0].textContent; // "We found [number] games"
          var endPos = totalResultsStr.split(' ', 3).join(' ').length;
          this.totalResults = totalResultsStr.slice(9, endPos);
          document.getElementById("total-results").hidden = false;


          var listData = this.root.getElementsByTagName('li');
          for(var i = 0; i < listData.length; i++) {
            var imgUrl = listData[i].getElementsByTagName('img')[0].src;
            var title = listData[i].getElementsByTagName('a')[0].title;
            var durationData = listData[i].getElementsByClassName('search_list_details_block')[0].children;

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

            this.gameList.push(game);
          }

          //debugger;
        });
  }

}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
