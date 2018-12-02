import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestaurantDataProvider } from '../../providers/restaurant-data/restaurant-data';
import { LoginPage } from '../login/login';

import { ProfileEntry } from '../../model/profile-entry';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  profileEntries: ProfileEntry[] = [];

  username: string;
  password: string;
  password_confirm: string;



  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantDataProvider: RestaurantDataProvider, private alertCtrl: AlertController) {
    // this.restaurantDataProvider.getObservable().subscribe(update => {
    //   this.profileEntries = restaurantDataProvider.getEntries();
    //   console.log(this.profileEntries);
    // })

  }

  private saveAccount(){
  	if(this.password == this.password_confirm){
  		// this.restaurantDataProvider.addEntry(this.profileEntries.username, this.profileEntries.password);
	  	this.navCtrl.push(LoginPage);
  	}
  	else{
  		  let alert = this.alertCtrl.create({
        title: "Wrong Password",
        subTitle: "Your passwords don't match each other. Please retype your password.",
        buttons: [
          {  
            text:  "Ok",
            role: "ok"
          } 
        ]
      });
      alert.present();
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
