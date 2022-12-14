//@ts-nocheck
import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, Subscription} from "rxjs";
import {User} from "../models/user.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AppState} from "../app.reducer";
import {Store} from "@ngrx/store";
import * as actions from "../auth/auth.actions";
import * as incomeExpenseActions from "../income-expense/income-expense.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription;
  private _user: User;

  get user() {
    return this._user;
  }

  constructor( public auth: AngularFireAuth,
               private fireStore: AngularFirestore,
               private store: Store<AppState> ) {}

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      if ( fuser ) {
        // exists
        this.userSubscription = this.fireStore.doc(`${ fuser.uid }/usuario`).valueChanges()
          .subscribe( (firestoreUser: any) => {
            const user = User.fromFirebase( firestoreUser );
            this._user = user;
            this.store.dispatch( actions.setUser({ user }));
          });

      } else {
        // doesn't exist
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch( actions.unSetUser() );
        this.store.dispatch( incomeExpenseActions.unSetItems() );
      }
    });
  }

  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then( ({user}) => {
      const newUser = new User(user.uid, user.email, name);
      return this.fireStore.doc(`${user?.uid}/usuario`).set({...newUser});
    });
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fuser => fuser != null )
    );
  }

}
