import { Injectable } from '@angular/core';
import { delay, of, type Observable } from 'rxjs';

import { CASES_MOCK_DATA } from './cases.mock';
import type { ICase } from '../models/case.interface';
import type { ICasesData } from '../models/cases-data.interface';
import { type ICasesQuery } from '../models/case-query.interface';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  getCasesData(query: ICasesQuery): Observable<ICasesData> {
    const filteredCases = this._filterCases(CASES_MOCK_DATA.cases, query);
    const paginatedCases = this._paginateCases(filteredCases, query);

    return of({
      cases: paginatedCases,
      total: filteredCases.length,
    }).pipe(delay(350));
  }

  private _filterCases(cases: readonly ICase[], query: ICasesQuery): readonly ICase[] {
    const search = query.filters.search.trim().toLowerCase();

    return cases.filter((caseItem) => {
      const matchesSearch =
        !search ||
        caseItem.id.toLowerCase().includes(search) ||
        caseItem.customer.toLowerCase().includes(search) ||
        caseItem.title.toLowerCase().includes(search);

      const matchesStatus = !query.filters.status || caseItem.status === query.filters.status;
      const matchesPriority =
        !query.filters.priority || caseItem.priority === query.filters.priority;
      const matchesAssignee =
        !query.filters.assignee || caseItem.assignee === query.filters.assignee;

      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });
  }

  private _paginateCases(cases: readonly ICase[], query: ICasesQuery): readonly ICase[] {
    const start = (query.pageIndex - 1) * query.pageSize;
    const end = start + query.pageSize;

    return cases.slice(start, end);
  }
}
