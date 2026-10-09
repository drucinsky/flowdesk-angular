import { Service } from '@angular/core';
import { delay, of, throwError, type Observable } from 'rxjs';

import { CASES_MOCK_DATA } from './cases.mock';
import { type TableSortValue, paginateTableItems, sortTableItems } from '../../../shared/table-state/utils/mock-table-query.util';
import type { ITableDataResult } from '../../../shared/table-state/models/table-data-result.interface';
import type { ITableQuery } from '../../../shared/table-state/models/table-query.interface';
import type { CaseSortKey } from '../models/case-sort-key.type';
import type { ICaseFilters } from '../models/case-filters.interface';
import type { ICase } from '../models/case.interface';
import { CaseStatus } from '../models/case-status.enum';

const SORT_VALUE_GETTERS: Record<CaseSortKey, (caseItem: ICase) => TableSortValue> = {
  id: (caseItem) => Number(caseItem.id.replace('#', '')),
  customer: (caseItem) => caseItem.customer.toLowerCase(),
  category: (caseItem) => caseItem.category,
  priority: (caseItem) => caseItem.priority,
  status: (caseItem) => caseItem.status,
  sla: (caseItem) => caseItem.sla.toLowerCase(),
  assignee: (caseItem) => caseItem.assignee.toLowerCase(),
  updatedAt: (caseItem) => Date.parse(caseItem.updatedAt),
};

/**
 * Simulates a backend table endpoint for static mock data.
 *
 * Filtering, sorting and pagination are implemented here only because this project
 * does not use a real backend yet. With a real API, this service would only send the
 * table query to the backend and return the paginated response.
 */
@Service()
export class CasesService {
  private _cases: ICase[] = [...CASES_MOCK_DATA];

  getCasesData(query: ITableQuery<ICaseFilters, CaseSortKey>): Observable<ITableDataResult<ICase>> {
    const filteredCases = this._filterCases(this._cases, query);
    const sortedCases = sortTableItems(filteredCases, query.sort, SORT_VALUE_GETTERS);
    const paginatedCases = paginateTableItems(sortedCases, query.pageIndex, query.pageSize);

    return of({
      items: paginatedCases,
      total: filteredCases.length,
    }).pipe(delay(350));
  }

  closeCase(caseId: string, _reason: string, _notifyClient: boolean): Observable<ICase> {
    const caseItem = this._cases.find((item) => item.id === caseId);

    if (!caseItem) {
      return throwError(() => new Error(`Case ${caseId} was not found.`));
    }

    const closedCase: ICase = {
      ...caseItem,
      status: CaseStatus.CLOSED,
      sla: 'Resolved',
      updatedAt: new Date().toISOString(),
    };

    this._cases = this._cases.map((item) => (item.id === caseId ? closedCase : item));

    return of(closedCase).pipe(delay(500));
  }

  private _filterCases(cases: readonly ICase[], query: ITableQuery<ICaseFilters, CaseSortKey>): readonly ICase[] {
    const search = query.filters.search.trim().toLowerCase();

    return cases.filter((caseItem) => {
      const matchesSearch =
        !search ||
        caseItem.id.toLowerCase().includes(search) ||
        caseItem.customer.toLowerCase().includes(search) ||
        caseItem.title.toLowerCase().includes(search);

      const matchesStatus = !query.filters.status || caseItem.status === query.filters.status;
      const matchesPriority = !query.filters.priority || caseItem.priority === query.filters.priority;
      const matchesAssignee = !query.filters.assignee || caseItem.assignee === query.filters.assignee;

      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });
  }
}
