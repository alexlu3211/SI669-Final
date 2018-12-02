import { Component } from '@angular/core';
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
export class ProfilePage {

  username: string = '';
  profileEntry: ProfileEntry;
<<<<<<< HEAD

  allergyLength: number = 0;
  preferenceLength: number = 0;

=======
>>>>>>> refs/remotes/origin/master
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
<<<<<<< HEAD

      this.allergyLength = this.profileEntry.allergy.length;
      this.preferenceLength = this.profileEntry.preference.length;
=======
      console.log("here", this.profileEntry);
>>>>>>> refs/remotes/origin/master
    })
  }

  private editEntry(entryID: number) {
<<<<<<< HEAD
    this.navCtrl.push(ProfileEditPage, {
      "username": this.username,
      "profileEntry": this.profileEntry
    });
  }

=======
    console.log("editing entry ", entryID);
    this.navCtrl.push(ProfileEditPage, {"entryID": entryID});
  }



>>>>>>> refs/remotes/origin/master
}
