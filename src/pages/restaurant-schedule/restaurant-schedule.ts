import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { RestaurantEntry } from '../../model/restaurant-entry';
import { EventEntry } from '../../model/event-entry';
import { ProfileEntry } from '../../model/profile-entry';
import { RestaurantDetailPage } from '../restaurant-detail/restaurant-detail';

@IonicPage()
@Component({
  selector: 'page-restaurant-schedule',
  templateUrl: 'restaurant-schedule.html',
})
export class RestaurantSchedulePage {

  cuisine: string;
  restaurantId: string;
  event: EventEntry;
  myDate: any = "";
  myTime: any = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public dataProvider: DataProvider) {

    this.restaurantId = this.navParams.get("restaurantId");
    this.cuisine = this.navParams.get("cuisine");

    this.event = new EventEntry();
    this.event.name = ""
    this.event.memo = ""
  }

  createEvent(){

    this.event.time = new Date(this.event.time).toString();
    console.log(this.event.time);
    
    this.event.restaurantId = this.restaurantId;
    console.log(this.event);

    this.dataProvider.createEvent(this.event);
    this.dataProvider.updateRestaurantEvents(this.cuisine, this.restaurantId, this.event.id);

    this.navCtrl.pop();

  }
}