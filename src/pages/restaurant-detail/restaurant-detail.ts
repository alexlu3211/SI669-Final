import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { RestaurantEntry } from '../../model/restaurant-entry';
import { EventEntry } from '../../model/event-entry';
import { ProfileEntry } from '../../model/profile-entry';
import { RestaurantSchedulePage } from '../restaurant-schedule/restaurant-schedule';

/**
 * Generated class for the RestaurantDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurant-detail',
  templateUrl: 'restaurant-detail.html',
})
export class RestaurantDetailPage {
  name: string = "";
  username: string = "";
  hostId: string = "";
  restaurantEntry: RestaurantEntry;
  eventEntry: EventEntry[] = [];
  profileEntry: ProfileEntry[] = [];

  // username_array = ["test1", "test3", "test2", "test2", "test4"];

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams, 
  			  private alertCtrl: AlertController, 
  			  public dataProvider: DataProvider) {

  	this.restaurantEntry = this.navParams.get("restaurantEntry");
  	console.log(this.restaurantEntry);

	this.name = this.navParams.get("name");

	this.hostId = dataProvider.getHostId();
	this.username = this.hostId;
	// this.profileEntry = new ProfileEntry();

	// this.restaurantEntry = new RestaurantEntry();
 //    this.dataProvider.loadDummyRestaurantEntries();
 //    this.dataProvider.getRestaurantObservable().subscribe(update => {
 //      this.restaurantEntry = dataProvider.getRestaurantByUsername(this.name);
 //    })

//     this.dataProvider.loadDummyProfileEntries();
//     this.dataProvider.getProfileObservable().subscribe(update => {
//       this.profileEntry = dataProvider.getProfileByUsername(this.username);
// })

  //   this.dataProvider.loadDummyProfileEntries();
  //   this.dataProvider.getProfileObservable().subscribe(update => {
  //     this.profileEntry = dataProvider.getProfileEntries();      
  // })

  //   this.dataProvider.loadDummyEventEntries();
  //   this.dataProvider.getEventObservable().subscribe(update => {
  //     this.eventEntry = dataProvider.getEventEntries();
  // })

  // for(let profile of this.profileEntry){

  //   console.log("Push to the profile entry: " + profile.username)
  // }


}

  private joinSchedule(hostId: string){
      let alert = this.alertCtrl.create({
      title: "Do you want to eat with this user?",
      buttons: [
        {  
          text:  "No",
          role: "no"
        },
        {  
          text:  "Yes",
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
              ]});
    		alert_second.present();    
          }}]});
    alert.present();    
  }


  private createSchedule(name: string){
  	this.navCtrl.push(RestaurantSchedulePage, {name: name});  	
  }
}