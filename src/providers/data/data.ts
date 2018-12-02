import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantEntry } from '../../model/restaurant-entry';
import { ProfileEntry } from '../../model/profile-entry';
import { EventEntry } from '../../model/event-entry';

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
export class DataProvider {

	private db: any;

	private profileEntries: ProfileEntry[] = [];
	private restaurantEntries: RestaurantEntry[] = [];
	private eventEntries: EventEntry[] = [];
	private username: string = "test1";

	private eventObserver: any;
	private eventObservable: Observable<EventEntry[]>;

	private profileObserver: any;
	private profileObservable: Observable<ProfileEntry>;

	private restaurantObserver: any;
	private restaurantObservable: Observable<RestaurantEntry[]>;

	private peopleObserver: any;
	private peopleObservable: Observable<ProfileEntry[]>;

	constructor(public http: HttpClient) {
		console.log('Hello DataProvider Provider');

		firebase.initializeApp(firebaseConfig);
		this.db = firebase.database();


		this.profileObservable = Observable.create((observer) => {
			this.profileObserver = observer;
		})

		this.eventObservable = Observable.create((observer)=> {
			this.eventObserver = observer;
		})

		this.restaurantObservable = Observable.create((observer) => {
			this.restaurantObserver = observer;
		})

		this.peopleObservable = Observable.create((observer) => {
			this.peopleObserver = observer;
		})

		// let dataRef = this.db.ref("/profiles");

		// dataRef.on("value", snapshot => {

		// 	this.profileEntries = [];
			
		// 	snapshot.forEach(childSnapshot => {
		// 		let entry = {
		// 			username: childSnapshot.val().username,
		// 			password: childSnapshot.val().password,
		// 			pic: childSnapshot.val().pic,
		// 			name: childSnapshot.val().name,
		// 			location: childSnapshot.val().location,
		// 			allergy: childSnapshot.val().allergy,
		// 			preference: childSnapshot.val().preference,
		// 			cost: childSnapshot.val().cost,
		// 			accompany: childSnapshot.val().accompany,
		// 			intro: childSnapshot.val().intro,
		// 			eventsId: childSnapshot.val().eventsId,
		// 		};
		// 		this.profileEntries.push(entry);
		// 		this.notifyProfileSubscribers();
		// 		console.log(this.profileEntries);
		// 	})
		// })

		// this.loadDummyProfileEntries()
		// this.loadDummyRestaurantEntries();
	}

	// -------------------------- Restaurant functions -------------------------

	public loadDummyRestaurantEntries(){
		this.http.get("../../assets/data/korean.json").subscribe(data => {
			for (let restaurant of data['restaurants']){
				this.restaurantEntries.push(restaurant)
			}
			this.notifyRestaurantSubscribers();
			console.log(this.restaurantEntries);
		});
	}

	public getRestaurantObservable(): Observable<RestaurantEntry[]> {
		return this.restaurantObservable; 
	}

	public getRestaurantEntries(): RestaurantEntry[]{
		return JSON.parse(JSON.stringify(this.restaurantEntries));
	}

	public notifyRestaurantSubscribers(): void {
		this.restaurantObserver.next(undefined);
	}

	// ---------------------------- People functions ---------------------------

	public getPeopleObservable(): Observable<ProfileEntry[]> {
		return this.peopleObservable;
	}

	// --------------------------- Profile functions ---------------------------

	public loadDummyProfileEntries(){
		this.http.get("../../assets/data/profiles.json").subscribe(data =>{
			for (let profile of data['profiles']){
				this.profileEntries.push(profile)
			}
			this.notifyProfileSubscribers();
			console.log(this.profileEntries);
		});
	}

	public getUserName(){
		return this.username;
	}

	public getProfileEntries():ProfileEntry[] {  
		let entriesClone = JSON.parse(JSON.stringify(this.profileEntries));
		return entriesClone;
	}

	public getProfileObservable(): Observable<any> {
		return this.profileObservable; 
	}

	public notifyProfileSubscribers(){
		this.profileObserver.next(undefined);
	}

	public updateProfileEntry(username: string,
							  newEntry: ProfileEntry): void {

		let parentRef = this.db.ref('/entries');
		let childRef = parentRef.child(username);
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

		// this.notifyProfileSubscribers();
	}

	public getProfileByUsername(username: string): ProfileEntry {
		for (let e of this.profileEntries) {
		  if (e.username === username) {
		     return e;
		  }
		}
		return undefined;
	}
}
