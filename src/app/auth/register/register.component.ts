import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLinkWithHref} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = fb.group({});
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['andres.fbramirez@gmail.com', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  createUser(): void {
    if (this.registerForm.invalid) {
      return;
    }
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading(null);
      },
    });

    const {name, email, password} = this.registerForm.value;
    this.authService.createUser(name, email, password)
      .then( credentials => {
        Swal.close()
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
