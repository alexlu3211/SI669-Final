import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestaurantListPage } from '../restaurant-list/restaurant-list';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  pushRestaurantListPage(cuisine: string) {
  	this.navCtrl.push(RestaurantListPage, {
		cuisine: cuisine
	});
  }

}
