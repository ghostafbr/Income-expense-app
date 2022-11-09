import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLinkWithHref} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
