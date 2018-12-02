import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestaurantListPage } from '../restaurant-list/restaurant-list';
import { DataProvider } from '../../providers/data/data';

import { RestaurantEntry } from '../../model/restaurant-entry';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private restaurantEntries: RestaurantEntry[];

  constructor(public navCtrl: NavController, 
  			      public navParams: NavParams,
              public dataProvider: DataProvider) {

    this.dataProvider.loadDummyRestaurantEntries();

    this.dataProvider.getRestaurantObservable().subscribe(update => {
      this.restaurantEntries = dataProvider.getRestaurantEntries();
      console.log(this.restaurantEntries);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  pushRestaurantListPage(cuisine: string) {
  	this.navCtrl.push(RestaurantListPage, {
		  cuisine: cuisine,
      restaurantEntries: this.restaurantEntries
	  });
  }

}
