import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IncomeExpense} from "../models/income-expense.model";
import {AuthService} from "./auth.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseServiceService {

  constructor( private fireStore: AngularFirestore,
               private authService: AuthService ) {

  }

  createIncomeExpense( incomeExpense: IncomeExpense ) {
    const uid = this.authService.user.uid;
    delete incomeExpense.uid;
    return this.fireStore.doc(`${uid}/income-expense`)
      .collection('items')
      .add({...incomeExpense})
  }

  initIncomeExpenseListener( uid: string ) {
    return this.fireStore.collection(`${uid}/income-expense/items`)
      .snapshotChanges()
      .pipe(
        map( (snapshot: any) => snapshot.map( (doc: any) => ({
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            })
          )
        )
      )
  }

  deleteIncomeExpense( uidItem: string ) {
    const uid = this.authService.user.uid;
    return this.fireStore.doc(`${uid}/income-expense/items/${uidItem}`).delete();
  }
}
