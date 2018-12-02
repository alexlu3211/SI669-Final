import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProfileDataProvider } from '../../providers/profile-data/profile-data';
import { DataProvider } from '../../providers/data/data';

import { ProfileEditPage } from '../profile-edit/profile-edit';
import { ProfileEntry } from '../../model/profile-entry';

const PLACEHOLDER_IMAGE: string = "/assets/imgs/profile/profile_0.jpg";
const SPINNER_IMAGE: string = "/assets/imgs/spinner.gif";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  username: string = '';
  profileEntry: ProfileEntry;
  private image = PLACEHOLDER_IMAGE;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public dataProvider: DataProvider) {

    this.username = dataProvider.getUserName();
    console.log(this.username);
    this.profileEntry = new ProfileEntry();


    this.dataProvider.loadDummyProfileEntries();
    this.dataProvider.getProfileObservable().subscribe(update => {
      this.profileEntry = dataProvider.getProfileByUsername(this.username);
      console.log("here", this.profileEntry);
    })
  }

  private editEntry(entryID: number) {
    console.log("editing entry ", entryID);
    this.navCtrl.push(ProfileEditPage, {"entryID": entryID});
  }



}
