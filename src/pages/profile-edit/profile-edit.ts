import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantDataProvider } from '../../providers/restaurant-data/restaurant-data';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ProfilePage } from '../profile/profile';
import { ProfileEntry } from '../../model/profile-entry';

const PLACEHOLDER_IMAGE: string = "/assets/imgs/profile/profile_0.jpg";
const SPINNER_IMAGE: string = "/assets/imgs/spinner.gif";

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {


	private entryTitle: string;
	private entryText: string;
	private placeholderImage = PLACEHOLDER_IMAGE;
	private profileEntries: ProfileEntry;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public restaurantDataProvider: RestaurantDataProvider,
				private camera: Camera) {

		let entryID = this.navParams.get("entryID");

		if (entryID === undefined) {
			this.profileEntries = new ProfileEntry();
			this.profileEntries.id;
			this.profileEntries.pic = this.placeholderImage;
			this.profileEntries.name = "";
			this.profileEntries.location = "";
			this.profileEntries.allergy = [];
			this.profileEntries.preference = [];
			this.profileEntries.cost = "";
			this.profileEntries.accompany = "";
			this.profileEntries.intro = "";
			this.profileEntries.id = -1; 
		} else {
			this.profileEntries = this.restaurantDataProvider.getEntryByID(entryID);
			if (this.profileEntries.pic == null) 
				this.profileEntries.pic = this.placeholderImage
		}

		console.log("retrieved entry:", this.profileEntries);
	}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }


	private saveEntry() {

		if (this.profileEntries.id === -1) { 
			this.restaurantDataProvider.addEntry(this.profileEntries);
		} else {
			// this.doCheckbox();
			this.restaurantDataProvider.updateEntry(this.profileEntries.id, this.profileEntries);
		}
		console.log(this.profileEntries.name)
		this.navCtrl.pop();
	}

	private cancelEntry(){
		this.navCtrl.pop();
	}

	private takePic() {

		const options: CameraOptions = {
		  quality: 100,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			if (imageData) {
				this.profileEntries.pic = 'data:image/jpeg;base64,' + imageData;   
			} else {
				this.profileEntries.pic = null;
			}
		}, (err) => {
			this.profileEntries.pic = PLACEHOLDER_IMAGE;
		});
		
		this.profileEntries.pic = SPINNER_IMAGE;
	}

}
