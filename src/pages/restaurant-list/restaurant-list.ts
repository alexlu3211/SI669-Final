import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantDataProvider } from '../../providers/restaurant-data/restaurant-data';
import { RestaurantEntry } from '../../model/restaurant-entry';

@IonicPage()
@Component({
  selector: 'page-restaurant-list',
  templateUrl: 'restaurant-list.html',
})
export class RestaurantListPage {

	cuisine: string = "";
	restaurantEntries: RestaurantEntry[] = [];

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public restaurantDataProvider: RestaurantDataProvider) {

		this.cuisine = this.navParams.get("cuisine");

		this.restaurantDataProvider.getRestaurantEntries(this.cuisine)
			.subscribe(data => {
				for (let entry of data['businesses']){
					this.restaurantEntries.push(entry)
				}
				console.log(this.restaurantEntries)
			});

	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantListPage');
  }

}
