import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

// import { RestaurantEntry } from '../../model/restaurant-entry';
import { EventEntry } from '../../model/event-entry';
import { ProfileEntry } from '../../model/profile-entry';

import { ScheduleDetailPage } from '../schedule-detail/schedule-detail';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  name: string = "";
  username: string = "";
  hostId: string = "";
  myDate: any;

  profileEntry: ProfileEntry[] = [];

  // restaurantEntry: RestaurantEntry;
  eventEntries: EventEntry[] = [];
  currentEventEntries: EventEntry[] = [];

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams, 
  			  public dataProvider: DataProvider) {

  	// this.restaurantEntry = this.navParams.get("restaurantEntry");
  	// console.log(this.restaurantEntry);

    this.dataProvider.eventSubject.subscribe(update => {
      this.eventEntries = dataProvider.getEventEntries();
      console.log(this.eventEntries);
      this.currentEventEntries = [];

      for (var event of this.eventEntries){
        // console.log(event.restaurantId, this.restaurantEntry.id)
        // if (event.restaurantId == this.restaurantEntry.id) 
          this.currentEventEntries.push(event);
      }
      console.log("current events", this.currentEventEntries);
    })

    this.dataProvider.profileSubject.subscribe();

    this.dataProvider.loadProfileEntries();
    this.dataProvider.loadEventEntries();

  }

  // private gotoScheduleDetail(currentEventEntries: EventEntry){
  // 	this.navCtrl.push(ScheduleDetailPage, {eventEntry: currentEventEntries});  
  // }

  private gotoScheduleDetail(eventEntries: EventEntry){
    this.navCtrl.push(ScheduleDetailPage, {eventEntry: eventEntries});  
  }


}