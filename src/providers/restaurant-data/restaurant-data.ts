import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantEntry } from '../../model/restaurant-entry';
import { ProfileEntry } from '../../model/profile-entry';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCGbFHLdOQ4gtG8X62d8926qSwFazII0K8",
    authDomain: "si669final.firebaseapp.com",
    databaseURL: "https://si669final.firebaseio.com",
    projectId: "si669final",
    storageBucket: "",
    messagingSenderId: "415154827824"
}; 


@Injectable()
export class RestaurantDataProvider {

	private db: any;
	private profileEntries: ProfileEntry[] = [];
	private nextID: number = 0;

	private serviceObserver: Observer<ProfileEntry[]>;
	private clientObservable: Observable<ProfileEntry[]>;

	private api_url: string;
	private token: string;

	constructor(public http: HttpClient, private storage: Storage) {
		console.log('Hello RestaurantDataProvider Provider');

		this.api_url = "https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search";
		this.token   = "5JESjqSuQjAxhIKo13z_ZP72phSJOcKuq6FyIo4qhOLv1Cr2k9KG8psXgpc6YnGNurBWHnCT03GSjp0VA4ljGy9ANdznHRj6Q6_2biw3P0keluALnJJOQrkJrOHtW3Yx"


		firebase.initializeApp(firebaseConfig);
		this.db = firebase.database();

		this.clientObservable = Observable.create(observerThatWasCreated => {
			this.serviceObserver = observerThatWasCreated
		});


		let dataRef = this.db.ref("/entries");

		dataRef.on("value", snapshot => {
			this.profileEntries = [];
			snapshot.forEach(childSnapshot => {
				let entry = {
					id: childSnapshot.key,
					pic: childSnapshot.val().pic,
					name: childSnapshot.val().name,
					location: childSnapshot.val().location,
					allergy: childSnapshot.val().allergy,
					preference: childSnapshot.val().preference,
					cost: childSnapshot.val().cost,
					accompany: childSnapshot.val().accompany,
					intro: childSnapshot.val().intro
				};
				this.profileEntries.push(entry);
				this.notifySubscribers();
				console.log(this.profileEntries);
			})
		})



	}

  getRestaurantEntries(cuisine: string){

  	return this.http.get("../../assets/data/" + cuisine + ".json");

  }




/*  FROM BELOW, I COPIED FROM MINI PROJ2 CODE  */
	public getEntries():ProfileEntry[] {  
		let entriesClone = JSON.parse(JSON.stringify(this.profileEntries));
		return entriesClone;
	}

	public addEntry(profileEntry:ProfileEntry) {

		let listRef = this.db.ref('/entries');
		let entriesRef = listRef.push();
		// '/' points to the root of the database 

		let dataRecord = {
			id: profileEntry.id,
			pic: profileEntry.pic,
			name: profileEntry.name,
			location: profileEntry.location,
			allergy: profileEntry.allergy,
			preference: profileEntry.preference,
			cost: profileEntry.cost,
			accompany: profileEntry.accompany,
			intro: profileEntry.intro
		}

		entriesRef.set(dataRecord);
		this.notifySubscribers();

		console.log("Added an entry, the list is now: ", this.profileEntries);
	}

	public getUniqueID(): number {
		let uniqueID = this.nextID ++;
		this.storage.set("nextID", this.nextID);

		return uniqueID;
	}

	public getObservable(): Observable<ProfileEntry[]> {
		return this.clientObservable; 
	}

	public notifySubscribers(): void {
		this.serviceObserver.next(undefined);
	}


	public updateEntry(id: number, newEntry: ProfileEntry): void {

		let parentRef = this.db.ref('/entries');
		let childRef = parentRef.child(id);
		childRef.set({id: newEntry.id, 
					pic: newEntry.pic, 
					name: newEntry.name, 
					location: newEntry.location, 
					allergy: newEntry.allergy, 
					preference: newEntry.preference,
					cost: newEntry.cost,
					accompany: newEntry.accompany,
					intro: newEntry.intro});

		this.notifySubscribers();
	}

	private findEntryByID(id: number): ProfileEntry {
		for (let e of this.profileEntries) {
		  if (e.id === id) {
		     return e;
		  }
		}
		return undefined;
	}

	public getEntryByID(id: number): ProfileEntry {
		for (let e of this.profileEntries) {
			if (e.id === id) {
				let clone = JSON.parse(JSON.stringify(e));
				return clone;
			}
		}
		return undefined;
	}


	public removeEntry(id: number): void {

		let parentRef = this.db.ref('/entries');
		let childRef = parentRef.child(id);
		childRef.remove();

		this.notifySubscribers();
	}
}
