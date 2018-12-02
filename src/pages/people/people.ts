import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ProfileEntry } from '../../model/profile-entry';


@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  username: string = '';
  profileEntry: ProfileEntry[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, private alertCtrl: AlertController) {
    this.username = dataProvider.getUserName();
    console.log(this.username);
    // this.profileEntry = new ProfileEntry[];


    this.dataProvider.loadDummyProfileEntries();
    this.dataProvider.getProfileObservable().subscribe(update => {
      this.profileEntry = dataProvider.getProfileEntries();
      console.log("people page", this.profileEntry);
    })

  }

  private setupschedule(){
      let alert = this.alertCtrl.create({
      title: "Do you want to eat with this user?",
      buttons: [
        {  
          text:  "No",
          role: "no"
        },
        {
          text: "Yes",
          handler: data => {
            console.log("Second Popup: Yes")
             let alert_second = this.alertCtrl.create({
              title: "We sent a text message to this user",
              subTitle: "You'll receive a text message soon",
              buttons: [
                {  
                  text:  "Ok",
                  role: "ok"
                }
              ]
            });
    alert_second.present();    
          }
          // role: "yes"
        }
      ]
    });
    alert.present();    
  }

  private no() {
    console.log("Second Popup: No")
    this.navCtrl.pop();
  }

  private yes() {
    console.log("Second Popup: Yes")
     let alert = this.alertCtrl.create({
      title: "We sent a text message to this user",
      subTitle: "You'll receive a text message soon",
      buttons: [
        {  
          text:  "No",
          role: "no"
        }
      ]
    });
    alert.present();    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
  }

}
