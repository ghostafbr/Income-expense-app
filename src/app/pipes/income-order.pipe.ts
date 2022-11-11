import { Pipe, PipeTransform } from '@angular/core';
import {IncomeExpense} from "../models/income-expense.model";

@Pipe({
  name: 'incomeOrder',
  standalone: true
})
export class IncomeOrderPipe implements PipeTransform {

  transform( items: IncomeExpense[] ): IncomeExpense[] {

    return items.sort( (a, b) => {
      if ( a.type === 'income' ) {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
