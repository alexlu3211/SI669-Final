import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

import { ProfileEditPage } from '../profile-edit/profile-edit';
import { ProfileEntry } from '../../model/profile-entry';

const PLACEHOLDER_IMAGE: string = "/assets/imgs/profile/profile_0.jpg";
const SPINNER_IMAGE: string = "/assets/imgs/spinner.gif";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit{

  username: string = '';
  profileEntry: ProfileEntry;

  allergyLength: number = 0;
  preferenceLength: number = 0;

  private image = PLACEHOLDER_IMAGE;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public dataProvider: DataProvider) {

    this.username = dataProvider.getUserName();
    console.log(this.username);
    this.profileEntry = new ProfileEntry();


    this.dataProvider.profileSubject.subscribe(update => {
      this.profileEntry = dataProvider.getProfileByUsername(this.username);
 
      this.allergyLength = this.profileEntry.allergy.length;
      this.preferenceLength = this.profileEntry.preference.length;

    })
  }

  ngOnInit(){
    this.dataProvider.loadProfileEntries();
  }

  private editEntry() {
    this.navCtrl.push(ProfileEditPage, {
      "username": this.username,
      "profileEntry": this.profileEntry
    });
  }
}
