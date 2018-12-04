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
	private restaurantEntries: {"korean": RestaurantEntry[], 
								"chinese": RestaurantEntry[], 
								"mexican": RestaurantEntry[], 
								"indian": RestaurantEntry[]} = {
								"korean": [], 
								"chinese": [], 
								"mexican": [], 
								"indian": []}
	private eventEntries: EventEntry[] = [];
	private username: string = "user001";

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
	}

	// -------------------------- Restaurant functions -------------------------

	// public loadDummyRestaurantEntries(){
	// 	this.http.get("../../assets/data/korean.json").subscribe(data => {
	// 		for (let restaurant of data['restaurants']){
	// 			this.restaurantEntries.push(restaurant)
	// 		}
	// 		this.notifyRestaurantSubscribers();
	// 		console.log(this.restaurantEntries);
	// 	});
	// }

	public loadRestaurantEntries(){
		this.loadRestaurantEntriesCuisine("korean");
		this.loadRestaurantEntriesCuisine("chinese");
		this.loadRestaurantEntriesCuisine("mexican");
		this.loadRestaurantEntriesCuisine("indian");
	}

	public loadRestaurantEntriesCuisine(cuisine: string){
		let dataRef = this.db.ref("/restaurants/" + cuisine);

		dataRef.on("value", snapshot => {
			this.restaurantEntries[cuisine] = [];
			snapshot.forEach(childSnapshot => {
				let entry = {
					id: childSnapshot.val().id,
					alias: childSnapshot.val().alia,
					name: childSnapshot.val().name,
					image_url: childSnapshot.val().image_url,
					is_closed: childSnapshot.val().is_closed,
					url: childSnapshot.val().url,
					eventsId: childSnapshot.val().eventsId,
					review_count: childSnapshot.val().review_count,
					categories: childSnapshot.val().categories,
					rating: childSnapshot.val().rating,
					coordinates: childSnapshot.val().coordinates,
					transactions: childSnapshot.val().transactions,
					price: childSnapshot.val().price,
					location: childSnapshot.val().location,
					phone: childSnapshot.val().phone,
					display_phone: childSnapshot.val().display_phone,
					distance: childSnapshot.val().distance
				};
				this.restaurantEntries[cuisine].push(entry);
				this.notifyRestaurantSubscribers();
			})
		})		
	}

	public getRestaurantObservable(): Observable<RestaurantEntry[]> {
		return this.restaurantObservable; 
	}

	public getRestaurantEntries(cuisine: string): RestaurantEntry[]{
		return JSON.parse(JSON.stringify(this.restaurantEntries[cuisine]));
	}

	public notifyRestaurantSubscribers(): void {
		this.restaurantObserver.next(undefined);
	}

	// ---------------------------- People functions ---------------------------

	public getPeopleObservable(): Observable<ProfileEntry[]> {
		return this.peopleObservable;
	}

	// --------------------------- Event functions -----------------------------

	public loadEventEntries(){
		let dataRef = this.db.ref("/events");

		dataRef.on("value", snapshot => {
			this.eventEntries = [];
			snapshot.forEach(childSnapshot => {
				let entry = {
					id: 		    childSnapshot.val().id,
					restaurantId:   childSnapshot.val().restaurantId,
					date: 		    childSnapshot.val().date,
					hostId: 	    childSnapshot.val().hostId,
					participantsId: childSnapshot.val().participantsId
				};
				this.eventEntries.push(entry);
			});
			this.notifyEventSubscribers();
			console.log("Yas", this.eventEntries);
		})		
	}

	public getEventEntries():ProfileEntry[] {  
		let entriesClone = JSON.parse(JSON.stringify(this.eventEntries));
		return entriesClone;
	}

	public getEventObservable(): Observable<any> {
		return this.eventObservable; 
	}

	public notifyEventSubscribers(){
		this.eventObserver.next(undefined);
	}

	public getEventByUsername(hostId: string): EventEntry {
		for (let e of this.eventEntries) {
		  if (e.hostId === hostId) {
		     return e;
		  }
		}
		return undefined;
	}

	public getHostId(){
		return this.hostId;
	}


	// --------------------------- Profile functions ---------------------------

	public loadDummyProfileEntries(){
		this.http.get("../../assets/data/profiles.json").subscribe(data =>{
			for (let profile of data['profiles']){
				this.profileEntries.push(profile)
			}
			this.notifyProfileSubscribers();
		});
	}

	public loadProfileEntries(){
		let dataRef = this.db.ref("/profiles");

		dataRef.on("value", snapshot => {
			this.profileEntries = [];
			snapshot.forEach(childSnapshot => {
				let entry = {
					username:   childSnapshot.val().username,
					password:   childSnapshot.val().password,
					pic: 	    childSnapshot.val().pic,
					name: 	    childSnapshot.val().name,
					location:   childSnapshot.val().location,
					available:  childSnapshot.val().available,
					allergy:    childSnapshot.val().allergy,
					preference: childSnapshot.val().preference,
					cost: 	    childSnapshot.val().cost,
					people: 	childSnapshot.val().people,
					intro: 		childSnapshot.val().intro,
					eventsId: 	childSnapshot.val().eventsId,
				};
				this.profileEntries.push(entry);
			});
			this.notifyProfileSubscribers();
		})
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
			people: newEntry.people,
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
