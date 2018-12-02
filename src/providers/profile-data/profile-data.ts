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
export class ProfileDataProvider {

	private db: any;
	private profileEntries: ProfileEntry[] = [];
	private nextID: number = 0;

	private serviceObserver: Observer<ProfileEntry[]>;
	private clientObservable: Observable<ProfileEntry[]>;

	constructor(public http: HttpClient) {
		console.log('Hello ProfileDataProvider Provider');

		firebase.initializeApp(firebaseConfig);
		this.db = firebase.database();

		this.clientObservable = Observable.create(observerThatWasCreated => {
			this.serviceObserver = observerThatWasCreated
		});

		let dataRef = this.db.ref("/profiles");

		dataRef.on("value", snapshot => {

			this.profileEntries = [];
			
			snapshot.forEach(childSnapshot => {
				let entry = {
					username: childSnapshot.val().username,
					password: childSnapshot.val().password,
					pic: childSnapshot.val().pic,
					name: childSnapshot.val().name,
					location: childSnapshot.val().location,
					allergy: childSnapshot.val().allergy,
					preference: childSnapshot.val().preference,
					cost: childSnapshot.val().cost,
					accompany: childSnapshot.val().accompany,
					intro: childSnapshot.val().intro,
					eventsId: childSnapshot.val().eventsId,
				};
				this.profileEntries.push(entry);
				this.notifySubscribers();
				console.log(this.profileEntries);
			})
		})

		this.loadDummyEntries().subscribe(data =>{
			// this.profileEntries = data;
			console.log(data)
		} )
	}

	loadDummyEntries(){
		return this.http.get("../../assets/data/profiles.json");
	}

	public getEntries():ProfileEntry[] {  
		let entriesClone = JSON.parse(JSON.stringify(this.profileEntries));
		return entriesClone;
	}

	public addEntry(profileEntry:ProfileEntry) {

		let listRef = this.db.ref('/profiles');
		let entriesRef = listRef.push();

		let dataRecord = {
			username: profileEntry.name,
			password: profileEntry.password,
			pic: profileEntry.pic,
			name: profileEntry.name,
			location: profileEntry.location,
			allergy: profileEntry.allergy,
			preference: profileEntry.preference,
			cost: profileEntry.cost,
			accompany: profileEntry.accompany,
			intro: profileEntry.intro,
			eventsId: profileEntry.eventsId
		}

		entriesRef.set(dataRecord);
		this.notifySubscribers();

		console.log("Added an entry, the list is now: ", this.profileEntries);
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
		childRef.set({
			username: newEntry.username,
			password: newEntry.password,
			pic: newEntry.pic, 
			name: newEntry.name, 
			location: newEntry.location, 
			allergy: newEntry.allergy, 
			preference: newEntry.preference,
			cost: newEntry.cost,
			accompany: newEntry.accompany,
			intro: newEntry.intro,
			eventsId: newEntry.eventsId
		});

		this.notifySubscribers();
	}

	private findEntryByUsername(username: string): ProfileEntry {
		for (let e of this.profileEntries) {
		  if (e.username === username) {
		     return e;
		  }
		}
		return undefined;
	}

	// public getEntryByID(id: number): ProfileEntry {
	// 	for (let e of this.profileEntries) {
	// 		if (e.id === id) {
	// 			let clone = JSON.parse(JSON.stringify(e));
	// 			return clone;
	// 		}
	// 	}
	// 	return undefined;
	// }
}
