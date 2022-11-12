import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ingresos y Gastos';

  constructor( private authService: AuthService ) {
    this.authService.initAuthListener();
  }
}
