import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantEntry } from '../../model/restaurant-entry';
import { ProfileEntry } from '../../model/profile-entry';
import { EventEntry } from '../../model/event-entry';

import { Subject } from 'rxjs/Subject';

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
	private username: string = "";
	private isLoggedIn: boolean = false;

	public restaurantSubject: any;
	public profileSubject:any;
	public eventSubject: any;

	constructor(public http: HttpClient) {
		console.log('Hello DataProvider Provider');

		firebase.initializeApp(firebaseConfig);
		this.db = firebase.database();

		this.restaurantSubject = new Subject<any>();
		this.profileSubject = new Subject<any>();
		this.eventSubject = new Subject<any>();
	}

	// -------------------------- Restaurant functions -------------------------

	public loadRestaurantEntries(){
		this.loadRestaurantEntriesCuisine("korean");
		this.loadRestaurantEntriesCuisine("chinese");
		this.loadRestaurantEntriesCuisine("mexican");
		this.loadRestaurantEntriesCuisine("indian");
		console.log(this.restaurantEntries);
	}

	public loadRestaurantEntriesCuisine(cuisine: string){
		let dataRef = this.db.ref("/restaurants/" + cuisine);

		dataRef.on("value", snapshot => {
			this.restaurantEntries[cuisine] = [];
			snapshot.forEach(childSnapshot => {
				let entry = {
					id: 			childSnapshot.val().id,
					alias: 			childSnapshot.val().alia,
					name: 			childSnapshot.val().name,
					cuisine:		childSnapshot.val().cuisine,
					image_url: 		childSnapshot.val().image_url,
					is_closed: 		childSnapshot.val().is_closed,
					url: 			childSnapshot.val().url,
					eventsId: 		childSnapshot.val().eventsId,
					review_count: 	childSnapshot.val().review_count,
					categories: 	childSnapshot.val().categories,
					rating: 		childSnapshot.val().rating,
					coordinates: 	childSnapshot.val().coordinates,
					transactions: 	childSnapshot.val().transactions,
					price: 			childSnapshot.val().price,
					location: 		childSnapshot.val().location,
					phone: 			childSnapshot.val().phone,
					display_phone: 	childSnapshot.val().display_phone,
					distance: 		childSnapshot.val().distance
				};
				this.restaurantEntries[cuisine].push(entry);
				this.notifyRestaurantSubscribers();
			})
		})		
	}

	public getRestaurantEntries(cuisine: string): RestaurantEntry[]{
		return this.restaurantEntries[cuisine];
	}

	public notifyRestaurantSubscribers(): void {
		this.restaurantSubject.next(undefined);
	}

	public getRestaurantById(cuisine:string, id:string){
		for (let restaurant of this.restaurantEntries[cuisine]){
			if (restaurant.id == id) 
				return restaurant;
		}
	}

	public getRestaurantCuisineById(id: string): string{
		let cuisines = ["korean", "chinese", "mexican", "indian"]
		for (let cuisine of cuisines){
			for (let restaurant of this.restaurantEntries[cuisine]){
				if (restaurant.id == id) 
					return restaurant.cuisine;
			}			
		}
		return "";
	}

	public getRestaurantName(id: string): string {

		let cuisines = ["korean", "chinese", "mexican", "indian"]
		for (let cuisine of cuisines){
			for (let restaurant of this.restaurantEntries[cuisine]){
				if (restaurant.id == id) 
					return restaurant.name;
			}			
		}

		return undefined;
	}

	public updateRestaurantEvents(cuisine:string, restaurantId: string, eventId: string){
		let dataRef = this.db.ref("/restaurants/" + cuisine + "/" + restaurantId);
		let	currentEventsId: string[] = []

		dataRef.on("value", snapshot => {
			if (snapshot.val().eventsId != null)
				currentEventsId =  snapshot.val().eventsId;
		})
		currentEventsId.push(eventId);

		dataRef.child("eventsId").set(currentEventsId);
		this.notifyRestaurantSubscribers();
	}

	// --------------------------- Event functions -----------------------------

	public loadEventEntries(){
		let dataRef = this.db.ref("/events");

		dataRef.on("value", snapshot => {
			this.eventEntries = [];
			snapshot.forEach(childSnapshot => {
				let entry = {
					id: 		    childSnapshot.val().id,
					name:           childSnapshot.val().name,
					restaurantId:   childSnapshot.val().restaurantId,
					date: 		    childSnapshot.val().date,
					time:           childSnapshot.val().time,
					hostId: 	    childSnapshot.val().hostId,
					participantsId: childSnapshot.val().participantsId,
					memo:           childSnapshot.val().memo
				};
				this.eventEntries.push(entry);
			});
			this.notifyEventSubscribers();
		})		
	}

	public createEvent(eventEntry: EventEntry): string {
		let dataRef = this.db.ref("/events");

		eventEntry.hostId = this.username;
		eventEntry.id = "event00" + (this.eventEntries.length + 1);
		console.log(eventEntry);

		dataRef.child(eventEntry.id).set(eventEntry);
		this.notifyEventSubscribers();

		dataRef = this.db.ref("/profiles");
		let currentCreatedEventsId = this.getProfileCreatedEventsByUsername(this.username)
		currentCreatedEventsId.push(eventEntry.id);
		dataRef.child(this.username).update({createdEventsId: currentCreatedEventsId});

		return eventEntry.id;
	}

	public getEventEntries():EventEntry[] {  
		return this.eventEntries;
	}


	public notifyEventSubscribers(){
		this.eventSubject.next(undefined);
	}

	public getEventByUsername(hostId: string): EventEntry {
		for (let e of this.eventEntries) {
		  if (e.hostId === hostId) {
		     return e;
		  }
		}
		return undefined;
	}

	// --------------------------- Profile functions ---------------------------

	public loadProfileEntries(){
		let dataRef = this.db.ref("/profiles");

		dataRef.on("value", snapshot => {
			this.profileEntries = [];
			snapshot.forEach(childSnapshot => {
				let entry = {
					username:   		childSnapshot.val().username,
					password:   		childSnapshot.val().password,
					pic: 	    		childSnapshot.val().pic,
					name: 	    		childSnapshot.val().name,
					location:   		childSnapshot.val().location,
					available:  		childSnapshot.val().available,
					allergy:    		childSnapshot.val().allergy,
					preference: 		childSnapshot.val().preference,
					cost: 	    		childSnapshot.val().cost,
					people: 			childSnapshot.val().people,
					intro: 				childSnapshot.val().intro,
					post: 			    childSnapshot.val().post,
					joinedEventsId: 	childSnapshot.val().joinedEventsId,
					createdEventsId:    childSnapshot.val().createdEventsId
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
		return this.profileEntries
	}

	public notifyProfileSubscribers(){
		this.profileSubject.next(undefined);
	}

	public getProfileByUsername(username: string): ProfileEntry {

		for (let profile of this.profileEntries) {
		  if (profile.username === username) {
		     return profile;
		  }
		}
		return undefined;
	}

	public getProfilePicByUsername(username: string): ProfileEntry {

		for (let profile of this.profileEntries) {
		  if (profile.username === username) {
		     return profile.pic;
		  }
		}
		return undefined;
	}

	public getProfileCreatedEventsByUsername(username: string): string[]{
		for (let profile of this.profileEntries) {
		  if (profile.username === username) {
		     if (profile.createdEventsId != null)
		     	return profile.createdEventsId
		     else return [];
		  }
		}		
	}

	public updateProfile(profileEntry: ProfileEntry){
		let dataRef = this.db.ref("/profiles");
		console.log(profileEntry);

		dataRef.child(profileEntry.username).update(profileEntry);
		this.notifyProfileSubscribers();
	}

	public updateAvailability(availability: boolean){
		let dataRef = this.db.ref("/profiles");
		dataRef.child(this.username).update({available: availability});
		this.notifyProfileSubscribers();		
	}

	public updateAvailabilityPost(availability: boolean, post: string){
		let dataRef = this.db.ref("/profiles");

		console.log("post", post);
		if (post != null) dataRef.child(this.username).update({post: post, available: availability});

		this.notifyProfileSubscribers();		
	}

	public verifyPassword(username: string, password: string): boolean{

		for (let profile of this.profileEntries){
			if (profile.username == username && profile.password == password){
				this.isLoggedIn = true;
				this.username = username;
				this.notifyProfileSubscribers();
				return true;
			}
		}
		return false;
	}
}
