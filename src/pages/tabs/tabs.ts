import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { PeoplePage } from '../people/people';
import { SchedulePage } from '../schedule/schedule';
import { ProfilePage } from '../profile/profile';

<<<<<<< HEAD
=======
import { LoginPage } from '../login/login';
>>>>>>> refs/remotes/origin/master

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SearchPage;
  tab2Root = PeoplePage;
<<<<<<< HEAD
  tab3Root = SchedulePage;
=======
  tab3Root = LoginPage;
>>>>>>> refs/remotes/origin/master
  tab4Root = ProfilePage;

  constructor() {

  }
}
