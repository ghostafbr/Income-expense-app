import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLinkWithHref} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2'
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import * as ui from '../../shared/ui.actions';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading: boolean = false;
  uiSubscription: Subscription | undefined;

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState>) {
    this.loginForm = fb.group({});
  }

  ngOnInit(): void {
    this.initForm();

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }


  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['andres.fbramirez@gmail.com', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signIn(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch( ui.isLoading() );

    /*    Swal.fire({
          title: 'Espere por favor',
          didOpen: () => {
            Swal.showLoading(null);
          },
        });*/

    const {email, password} = this.loginForm.value;
    this.authService.signIn(email, password).then( credentials => {
      /*Swal.close();*/
      this.store.dispatch( ui.stopLoading() );
      this.router.navigate(['/']);
    }).catch(( err ) => {
      this.store.dispatch( ui.stopLoading() );
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
      })
    });
  }

}
