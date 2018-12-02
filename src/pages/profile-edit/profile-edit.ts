import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ProfilePage } from '../profile/profile';
import { ProfileEntry } from '../../model/profile-entry';

const PLACEHOLDER_IMAGE: string = "/assets/imgs/profile/profile_0.jpg";
const SPINNER_IMAGE: string = "/assets/imgs/spinner.gif";

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

	private username: string;
	private profileEntry: ProfileEntry;

	private entryTitle: string;
	private entryText: string;
	private placeholderImage = PLACEHOLDER_IMAGE;
	private profileEntries: ProfileEntry;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public dataProvider: DataProvider,
				private camera: Camera) {

		this.username = this.navParams.get("username");
		this.profileEntry = this.navParams.get("profileEntry");s


		// if (entryID === undefined) {
		// 	this.profileEntries = new ProfileEntry();
		// 	this.profileEntries.username;
		// 	this.profileEntries.pic = this.placeholderImage;
		// 	this.profileEntries.password = "";
		// 	this.profileEntries.name = [];
		// 	this.profileEntries.location = "";
		// 	this.profileEntries.allergy = [];
		// 	this.profileEntries.preference = [];
		// 	this.profileEntries.cost = "";
		// 	this.profileEntries.accompany = "";
		// 	this.profileEntries.intro = "";
		// 	this.profileEntries.eventsId = []
		// } else {
		// 	this.profileEntries = this.dataProvider.getProfileByUsername(entryID);
		// 	if (this.profileEntries.pic == null) 
		// 		this.profileEntries.pic = this.placeholderImage
		// }

		// console.log("retrieved entry:", this.profileEntries);
	}
	
	private saveEntry() {

		if (this.profileEntries.username === "") { 
			// this.dataProvider.addEntry(this.profileEntries);
		} else {
			// this.doCheckbox();
			this.dataProvider.updateProfileEntry(this.profileEntries.username, this.profileEntries);
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
