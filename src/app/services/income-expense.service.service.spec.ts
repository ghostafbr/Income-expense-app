import { TestBed } from '@angular/core/testing';

import { IncomeExpenseServiceService } from './income-expense.service.service';

describe('IncomeExpenseServiceService', () => {
  let service: IncomeExpenseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeExpenseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
