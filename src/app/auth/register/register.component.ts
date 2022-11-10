import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLinkWithHref} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import * as ui from "../../shared/ui.actions";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  isLoading: boolean;
  uiSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.registerForm = fb.group({});
    this.isLoading = false;

  }

  ngOnInit(): void {
    this.initForm();
    this.uiSubscription = this.store.select('ui').subscribe( ui => { this.isLoading = ui.isLoading; });
  }

  ngOnDestroy() {
    this.uiSubscription?.unsubscribe();
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
    /*Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading(null);
      },
    });*/

    this.store.dispatch( ui.isLoading() );

    const {name, email, password} = this.registerForm.value;
    this.authService.createUser(name, email, password)
      .then( credentials => {
        /*Swal.close()*/
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
