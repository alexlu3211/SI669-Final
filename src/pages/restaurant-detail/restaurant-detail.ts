import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { RestaurantEntry } from '../../model/restaurant-entry';
import { EventEntry } from '../../model/event-entry';
import { ProfileEntry } from '../../model/profile-entry';
import { RestaurantSchedulePage } from '../restaurant-schedule/restaurant-schedule';

@IonicPage()
@Component({
  selector: 'page-restaurant-detail',
  templateUrl: 'restaurant-detail.html',
})
export class RestaurantDetailPage {

  username: string = '';

  profileEntry: ProfileEntry[] = [];

  cuisine: string;
  restaurantId: string;
  restaurantEntry: RestaurantEntry;
  eventEntries: EventEntry[] = [];
  currentEventEntries: EventEntry[] = [];

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams, 
  			  private alertCtrl: AlertController, 
  			  public dataProvider: DataProvider) {

  	this.restaurantEntry = this.navParams.get("restaurantEntry");
    this.restaurantId = this.navParams.get("restaurantId");
    this.cuisine = this.navParams.get("cuisine");
    this.username = this.dataProvider.getUserName();

    this.dataProvider.restaurantSubject.subscribe(update => {
      this.restaurantEntry = dataProvider.getRestaurantById(this.cuisine, this.restaurantId);
      // console.log("current restaurant", dataProvider.getRestaurantById(this.cuisine, this.restaurantId));
    })

    this.dataProvider.eventSubject.subscribe(update => {
      this.eventEntries = dataProvider.getEventEntries();
      this.currentEventEntries = [];

      for (var event of this.eventEntries){
        if (event.restaurantId == this.restaurantEntry.id) 
          this.currentEventEntries.push(event);
      }
      console.log(this.currentEventEntries)
    })

    this.dataProvider.profileSubject.subscribe();

    this.dataProvider.loadProfileEntries();
    this.dataProvider.loadEventEntries();

  }

  isUserInEvent(event: EventEntry):boolean {
    if (event.participantsId == null) return false;
    return event.participantsId.indexOf(this.username) > -1
  }

  private joinEvent(event: EventEntry){
      let alert = this.alertCtrl.create({
      title: "Do you want to join this event?",
      buttons: [
        {  
          text:  "No",
          role: "no"
        },
        {  
          text:  "Yes",
          handler: data => {
              // console.log("Second Popup: Yes")
              let alert_second = this.alertCtrl.create({
              title: "Congratulations",
              subTitle: "You have joined the event " + event.name,
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

  private quitEvent(event: EventEntry){
      let alert = this.alertCtrl.create({
      title: "Do you want to quite this event?",
      buttons: [
        {  
          text:  "No",
          role: "no"
        },
        {  
          text:  "Yes",
          handler: data => {
              // console.log("Second Popup: Yes")
              let alert_second = this.alertCtrl.create({
              title: "Cancellation Confirmed",
              subTitle: "You have quitted the event " + event.name,
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

  private createNewEvent(){
  	this.navCtrl.push(RestaurantSchedulePage, {
      cuisine: this.cuisine,
      restaurantId: this.restaurantId
    });  	
  }
}