import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestaurantDataProvider } from '../../providers/restaurant-data/restaurant-data';

import { ProfileEditPage } from '../profile-edit/profile-edit';
import { ProfileEntry } from '../../model/profile-entry';

const PLACEHOLDER_IMAGE: string = "/assets/imgs/profile/profile_0.jpg";
const SPINNER_IMAGE: string = "/assets/imgs/spinner.gif";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileEntries: ProfileEntry[] = [];
  private image = PLACEHOLDER_IMAGE;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantDataProvider: RestaurantDataProvider) {
    this.restaurantDataProvider.getObservable().subscribe(update => {
      this.profileEntries = restaurantDataProvider.getEntries();
      console.log(this.profileEntries);
    })


  }

  private editEntry(entryID: number) {
    console.log("editing entry ", entryID);
    this.navCtrl.push(ProfileEditPage, {"entryID": entryID});
  }



}
