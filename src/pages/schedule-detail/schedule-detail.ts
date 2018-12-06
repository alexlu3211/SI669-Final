import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { EventEntry } from '../../model/event-entry';
import { ProfileEntry } from '../../model/profile-entry';

/**
 * Generated class for the ScheduleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule-detail',
  templateUrl: 'schedule-detail.html',
})
export class ScheduleDetailPage {
  name: string = "";
  username: string = "";
  hostId: string = "";
  myDate: any;

  profileEntry: ProfileEntry;

  // restaurantEntry: RestaurantEntry;
  eventEntry: EventEntry;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams, 
  			  public dataProvider: DataProvider) {

  	this.eventEntry = this.navParams.get("eventEntry");
  	console.log(this.eventEntry);


  	this.profileEntry = new ProfileEntry();

    // this.dataProvider.getEventObservable().subscribe(update => {
    //   this.eventEntry = dataProvider.getEventByUsername(this.hostId);
    // })

    this.dataProvider.profileSubject.subscribe(update => {
      this.profileEntry = dataProvider.getProfileByUsername(this.hostId);
      console.log("Profile Entry: " + this.profileEntry)
    })


    // this.dataProvider.getEventObservable().subscribe(update => {
    //   this.eventEntries = dataProvider.getEventEntries();
    //   console.log(this.eventEntries);
    //   this.currentEventEntries = [];

    //   for (var event of this.eventEntries){
    //     // console.log(event.restaurantId, this.restaurantEntry.id)
    //     // if (event.restaurantId == this.restaurantEntry.id) 
    //       this.currentEventEntries.push(event);
    //   }
    //   console.log("current events", this.currentEventEntries);
    // })

    this.dataProvider.loadProfileEntries();
    this.dataProvider.loadEventEntries();
  }

  ngOnInit(){
    // this.dataProvider.loadProfileEntries();
    this.profileEntry = this.dataProvider.getProfileByUsername(this.hostId);

  }


}