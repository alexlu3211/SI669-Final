import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { RestaurantEntry } from '../../model/restaurant-entry';

@IonicPage()
@Component({
  selector: 'page-restaurant-list',
  templateUrl: 'restaurant-list.html',
})

export class RestaurantListPage {

	cuisine: string = "";
	restaurantEntries: RestaurantEntry[] = null;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public dataProvider: DataProvider) {

		this.cuisine = this.navParams.get("cuisine");
	 	this.restaurantEntries = this.navParams.get("restaurantEntries");

	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantListPage');
  }

}
