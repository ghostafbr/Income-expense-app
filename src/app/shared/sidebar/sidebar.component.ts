import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLinkActive, RouterLinkWithHref} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  // @ts-ignore
  userSubscription: Subscription;
  public username: string = '';

  constructor( private authService: AuthService, private router: Router, private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter( ( {user} ) => user != null )
      ).subscribe( ({user}) => {
        this.username = user.name;
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  singOut(): void {

    Swal.fire({
      title: 'Cerrando sesión',
      didOpen: () => {
        Swal.showLoading(null);
      },
    });

    this.authService.signOut().then(() => {
      Swal.close();
      this.router.navigate(['/login']);
    });
  }


}
