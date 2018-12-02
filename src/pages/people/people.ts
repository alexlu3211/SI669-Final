import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileEntry } from '../../model/profile-entry';
import { RestaurantDataProvider } from '../../providers/restaurant-data/restaurant-data';

/**
 * Generated class for the PeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  profileEntries: ProfileEntry[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantDataProvider: RestaurantDataProvider) {
    this.restaurantDataProvider.getObservable().subscribe(update => {
      this.profileEntries = restaurantDataProvider.getEntries();
      console.log(this.profileEntries);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
  }

}
