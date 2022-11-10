import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {map, Observable, tap} from "rxjs";
import {AuthService} from "./auth.service";
import {canActivate} from "@angular/fire/auth-guard";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap( state => {
        console.log(state)
        if (!state) {
          this.router.navigate(['/login']);
        }
      }),
    );
  }

}
