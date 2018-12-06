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

  username: string = "";
  hostId: string = "";

  profileEntry: ProfileEntry[] = [];
  myProfile: ProfileEntry;
  createdEventEntries: EventEntry[] = [];
  joinedEventEntries: EventEntry[] = [];
  eventEntries: EventEntry[] = [];

  constructor(public navCtrl: NavController, 
  			      public navParams: NavParams, 
  			      public dataProvider: DataProvider) {

    this.dataProvider.profileSubject.subscribe(update =>{
      this.username = dataProvider.getUserName();
      this.myProfile = dataProvider.getProfileByUsername(this.username);
    });

    this.dataProvider.eventSubject.subscribe(update => {
      this.eventEntries = dataProvider.getEventEntries();
      this.createdEventEntries = [];
      this.joinedEventEntries = [];

      for (let event of this.eventEntries){
        if (this.myProfile.createdEventsId.indexOf(event.id) > -1) 
          this.createdEventEntries.push(event);
        if (this.myProfile.joinedEventsId.indexOf(event.id) > -1) 
          this.joinedEventEntries.push(event);
      }
      console.log("created events", this.createdEventEntries);
      console.log("joined events", this.joinedEventEntries);
    })

    this.dataProvider.loadProfileEntries();
    this.dataProvider.loadEventEntries();

  }

  private gotoScheduleDetail(eventEntries: EventEntry){
    this.navCtrl.push(ScheduleDetailPage, {eventEntry: eventEntries});  
  }


}