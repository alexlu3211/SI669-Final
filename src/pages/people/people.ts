import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ProfileEntry } from '../../model/profile-entry';

import { PeopleDetailPage } from '../people-detail/people-detail';


@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  username: string = '';
  profileEntries: ProfileEntry[] = [];
  myProfile: ProfileEntry;
  availableProfiles: ProfileEntry[] = [];

  msg: string = '';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public dataProvider: DataProvider, 
              private alertCtrl: AlertController) {
    
    this.username = dataProvider.getUserName();
    this.myProfile = new ProfileEntry();
    this.dataProvider.loadProfileEntries();

    this.dataProvider.profileSubject.subscribe(update => {
      this.myProfile = dataProvider.getProfileByUsername(this.username);
      if (this.myProfile.post != null) this.myProfile.post = "";

      this.profileEntries = dataProvider.getProfileEntries();

      this.availableProfiles = [];
      for (let profile of this.profileEntries){
        if (profile.available && profile.username!=this.username){
          this.availableProfiles.push(profile);
        }
      }
      console.log(this.availableProfiles)
    })
  }

  updateAvailability(){
    if (!this.myProfile.available)
      this.myProfile.post = "";
    this.dataProvider.updateAvailability(this.myProfile.available, this.myProfile.post);
  }

  becomeAvailable(){
    this.myProfile.available = true;
    this.updateAvailability();
  }

  gotoPeopleDatail(availableProfiles: ProfileEntry){
    this.navCtrl.push(PeopleDetailPage, {profileEntry: availableProfiles});      
  }

  // private setupschedule(username: string){
  //     console.log("Check this username" + username)
  //     let alert = this.alertCtrl.create({
  //     title: "Do you want to eat with this user?",
  //     // template: '<center><img src="https://randomuser.me/api/portraits/men/32.jpg"/></center>',
  //     buttons: [
  //       {  
  //         text:  "No",
  //         role: "no"
  //       },
  //       {
  //         text: "Yes",
  //         handler: data => {
  //           console.log("Second Popup: Yes")
  //            let alert_second = this.alertCtrl.create({
  //             title: "We sent a text message to this user",
  //             subTitle: "You'll receive a text message soon",
  //             buttons: [
  //               {  
  //                 text:  "Ok",
  //                 role: "ok"
  //               }
  //             ]
  //           });
  //   alert_second.present();    
  //         }
  //       }
  //     ]
  //   });
  //   alert.addInput({
  //     type: 'image',
  //     label: 'https://randomuser.me/api/portraits/men/32.jpg',
  //     value: 'value1',
  //     checked: true
  //   });

  //   alert.present();    
  // }

  // private no() {
  //   console.log("Second Popup: No")
  //   this.navCtrl.pop();
  // }

  // private yes() {
  //   console.log("Second Popup: Yes")
  //    let alert = this.alertCtrl.create({
  //     title: "We sent a text message to this user",
  //     subTitle: "You'll receive a text message soon",
  //     buttons: [
  //       {  
  //         text:  "No",
  //         role: "no"
  //       }
  //     ]
  //   });
  //   alert.present();    
  // }

}