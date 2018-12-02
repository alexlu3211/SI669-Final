import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileEntry } from '../../model/profile-entry';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  profileEntries: ProfileEntry[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public dataProvider: DataProvider) {

    this.dataProvider.getPeopleObservable().subscribe(update => {
      this.profileEntries = dataProvider.getProfileEntries();
      console.log(this.profileEntries);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
  }

}
