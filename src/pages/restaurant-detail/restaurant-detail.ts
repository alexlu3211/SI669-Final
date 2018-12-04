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
  myDate: any;

  profileEntry: ProfileEntry[] = [];

  restaurantEntry: RestaurantEntry;
  eventEntries: EventEntry[] = [];
  currentEventEntries: EventEntry[] = [];

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams, 
  			  private alertCtrl: AlertController, 
  			  public dataProvider: DataProvider) {

  	this.restaurantEntry = this.navParams.get("restaurantEntry");
  	console.log(this.restaurantEntry);



    this.dataProvider.getEventObservable().subscribe(update => {
      this.eventEntries = dataProvider.getEventEntries();
      console.log(this.eventEntries);
      this.currentEventEntries = [];

      for (var event of this.eventEntries){
        console.log(event.restaurantId, this.restaurantEntry.id)
        if (event.restaurantId == this.restaurantEntry.id) 
          this.currentEventEntries.push(event);
      }
      console.log("current events", this.currentEventEntries);
    })

    this.dataProvider.getProfileObservable().subscribe();

    this.dataProvider.loadProfileEntries();
    this.dataProvider.loadEventEntries();

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