import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLinkActive, RouterLinkWithHref} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
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
