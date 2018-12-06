import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileEntry } from '../../model/profile-entry';

/**
 * Generated class for the PeopleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-people-detail',
  templateUrl: 'people-detail.html',
})
export class PeopleDetailPage {

  profileEntry: ProfileEntry;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  this.profileEntry = this.navParams.get("profileEntry");

  }




}
