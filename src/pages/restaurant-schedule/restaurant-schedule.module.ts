import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantSchedulePage } from './restaurant-schedule';

@NgModule({
  declarations: [
    RestaurantSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantSchedulePage),
  ],
})
export class RestaurantSchedulePageModule {}
