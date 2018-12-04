import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { RestaurantEntry } from '../../model/restaurant-entry';
import { EventEntry } from '../../model/event-entry';
import { ProfileEntry } from '../../model/profile-entry';
import { RestaurantDetailPage } from '../restaurant-detail/restaurant-detail';

/**
 * Generated class for the RestaurantSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurant-schedule',
  templateUrl: 'restaurant-schedule.html',
})
export class RestaurantSchedulePage {
  name: string = "";	
  restaurantEntry: RestaurantEntry;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
	this.name = this.navParams.get("name");
	this.restaurantEntry = new RestaurantEntry();
    // this.dataProvider.loadDummyRestaurantEntries();
    this.dataProvider.getRestaurantObservable().subscribe(update => {
      // this.restaurantEntry = dataProvider.getRestaurantByUsername(this.name);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantSchedulePage');
  }

}