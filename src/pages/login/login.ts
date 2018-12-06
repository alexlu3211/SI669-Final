import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
// import { RestaurantDataProvider } from '../../providers/restaurant-data/restaurant-data';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { DataProvider } from '../../providers/data/data'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string = "";
  password: string = "";
  correct: boolean = true;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private alertCtrl: AlertController,
              private app: App,
              private dataProvider: DataProvider) {

    this.dataProvider.loadProfileEntries();
  }

  login(){

    this.correct = this.dataProvider.verifyPassword(this.username, this.password);

    if (this.correct){
      this.app.getRootNav().setRoot(TabsPage);
    }

  }

  signup(){
      this.navCtrl.push(SignupPage);
  }

}
