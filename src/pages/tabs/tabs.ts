import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { PeoplePage } from '../people/people';
import { SchedulePage } from '../schedule/schedule';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SearchPage;
  tab2Root = PeoplePage;

  tab3Root = SchedulePage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
