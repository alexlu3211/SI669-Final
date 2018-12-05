import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

	newChip: string = ""


	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public dataProvider: DataProvider,
				public alertCtrl: AlertController,
				private camera: Camera) {

		this.username = this.navParams.get("username");
		this.profileEntry = this.navParams.get("profileEntry");

		console.log(this.profileEntry);

	}

	addAllergyChip() {
	  let alert = this.alertCtrl.create({
	    title: 'Add New Allergy',
	    inputs: [
	      {
	        name: 'newAllergy',
	        placeholder: 'Description'
	      }
	    ],
	    buttons: [
	      {
	        text: 'Cancel',
	        role: 'cancel'
	      },
	      {
	        text: 'Add',
	        handler: data => {
	        	this.profileEntry.allergy.push(data.newAllergy);
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	deleteAllergyChip(index: number){
		this.profileEntry.allergy.splice(index, 1);
	}

	addPreferenceChip() {
	  let alert = this.alertCtrl.create({
	    title: 'Add New Food Preference',
	    inputs: [
	      {
	        name: 'newPreference',
	        placeholder: 'Description'
	      }
	    ],
	    buttons: [
	      {
	        text: 'Cancel',
	        role: 'cancel'
	      },
	      {
	        text: 'Add',
	        handler: data => {
	        	this.profileEntry.preference.push(data.newPreference);
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	deletePreferenceChip(index: number){
		this.profileEntry.preference.splice(index, 1);
	}
	
	private updateProfile() {
		console.log("updating profile...");
		this.dataProvider.updateProfile(this.profileEntry);
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
