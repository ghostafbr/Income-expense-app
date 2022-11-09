import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLinkWithHref} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
