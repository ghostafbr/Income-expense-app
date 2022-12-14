import {enableProdMode, importProvidersFrom} from '@angular/core';
import { environment } from './environments/environment';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AppRouting} from "./app/app-routing";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {StoreModule} from "@ngrx/store";
import {appReducers} from "./app/app.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {IncomeOrderPipe} from "./app/pipes/income-order.pipe";
import {NgChartsModule} from "ng2-charts";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      RouterModule.forRoot(AppRouting, {useHash: true}),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      StoreModule.forRoot(appReducers),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
      }),
      NgChartsModule.forRoot()
    )
  ],
}).catch( err => console.error(err));
