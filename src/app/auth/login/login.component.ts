import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLinkWithHref} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = fb.group({});
  }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['andres.fbramirez@gmail.com', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  signIn(): void {
    if (this.loginForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading(null);
      },
    });

    const {email, password} = this.loginForm.value;
    this.authService.signIn(email, password).then( credentials => {
      Swal.close();
      this.router.navigate(['/']);
    }).catch(( err ) => {
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
      })
    });
  }

}
