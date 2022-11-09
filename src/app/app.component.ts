import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {SidebarComponent} from "./shared/sidebar/sidebar.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {FooterComponent} from "./shared/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent, RegisterComponent, SidebarComponent, NavbarComponent, FooterComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'incomeexpenseapp';
}
