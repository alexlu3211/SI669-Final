import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavController, NavParams } from 'ionic-angular';
import { ProfileEntry } from '../../model/profile-entry';
import { DataProvider } from '../../providers/data/data';
=======
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ProfileEntry } from '../../model/profile-entry';

/**
 * Generated class for the PeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
>>>>>>> refs/remotes/origin/master

@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

<<<<<<< HEAD
  profileEntries: ProfileEntry[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public dataProvider: DataProvider) {

    this.dataProvider.getPeopleObservable().subscribe(update => {
      this.profileEntries = dataProvider.getProfileEntries();
      console.log(this.profileEntries);
=======
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
>>>>>>> refs/remotes/origin/master
    })

  }

<<<<<<< HEAD
=======
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


>>>>>>> refs/remotes/origin/master
  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
  }

}
