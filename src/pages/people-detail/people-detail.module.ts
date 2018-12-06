import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeopleDetailPage } from './people-detail';

@NgModule({
  declarations: [
    PeopleDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PeopleDetailPage),
  ],
})
export class PeopleDetailPageModule {}
