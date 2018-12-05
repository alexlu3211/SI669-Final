import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ProfileEntry } from '../../model/profile-entry';

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

  username: string = '';
  profileEntry: ProfileEntry[] = [];
  myprofileEntry: ProfileEntry;

  availability = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, private alertCtrl: AlertController) {
    this.username = dataProvider.getUserName();
    console.log(this.username);
    this.myprofileEntry = new ProfileEntry();

    // this.dataProvider.loadDummyProfileEntries();
    this.dataProvider.profileSubject.subscribe(update => {
      this.profileEntry = dataProvider.getProfileEntries();
      this.myprofileEntry = dataProvider.getProfileByUsername(this.username);
      this.profileEntry.shift();
      console.log("people page", this.profileEntry);
    })
  }

  private setupschedule(username: string){
      console.log("Check this username" + username)
      let alert = this.alertCtrl.create({
      title: "Do you want to eat with this user?",
      // template: '<center><img src="https://randomuser.me/api/portraits/men/32.jpg"/></center>',
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
        }
      ]
    });
    alert.addInput({
      type: 'image',
      label: 'https://randomuser.me/api/portraits/men/32.jpg',
      value: 'value1',
      checked: true
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