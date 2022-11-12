// @ts-nocheck
import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {filter, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  public username: string = '';

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.userSubscription = this.store.select('user')
      .pipe(
        filter( ( {user} ) => user != null )
      ).subscribe( ({user}) => { this.username = user.name });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
