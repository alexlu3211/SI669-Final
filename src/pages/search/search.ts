import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestaurantListPage } from '../restaurant-list/restaurant-list';
import { DataProvider } from '../../providers/data/data';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { RestaurantEntry } from '../../model/restaurant-entry';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private restaurantEntries: {"korean": RestaurantEntry[], 
                "chinese": RestaurantEntry[], 
                "mexican": RestaurantEntry[], 
                "indian": RestaurantEntry[]} = {
                "korean": [], 
                "chinese": [], 
                "mexican": [], 
                "indian": []}

  constructor(public navCtrl: NavController, 
  			      public navParams: NavParams,
              public dataProvider: DataProvider,
              public localNotifications: LocalNotifications) {

    this.dataProvider.loadRestaurantEntries();

    this.dataProvider.restaurantSubject.subscribe(update => {
      this.restaurantEntries.korean = dataProvider.getRestaurantEntries("korean");
      this.restaurantEntries.chinese = dataProvider.getRestaurantEntries("chinese");
      this.restaurantEntries.mexican = dataProvider.getRestaurantEntries("mexican");
      this.restaurantEntries.indian = dataProvider.getRestaurantEntries("indian");

      // this.localNotifications.schedule({
      //   id: 1,
      //   text: "Test"
      // })
    })

  }

  pushRestaurantListPage(cuisine: string) {
  	this.navCtrl.push(RestaurantListPage, {
		  cuisine: cuisine,
      restaurantEntries: this.restaurantEntries[cuisine]
	  });
  }

}
