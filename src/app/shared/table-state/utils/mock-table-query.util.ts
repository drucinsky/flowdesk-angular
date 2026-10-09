import { type ITableSort, TableSortDirection } from '../models/table-sort.interface';

export type TableSortValue = string | number;

/**
 * Helpers for mocked table endpoints only. With a real backend, sorting and pagination
 * are done by the API and these helpers are removed together with the mocks.
 */
export function sortTableItems<TItem, TSortKey extends string>(
  items: readonly TItem[],
  sort: ITableSort<TSortKey> | null,
  valueGetters: Record<TSortKey, (item: TItem) => TableSortValue>,
): readonly TItem[] {
  if (!sort) {
    return items;
  }

  const sortMultiplier = sort.direction === TableSortDirection.ASC ? 1 : -1;
  const getSortValue = valueGetters[sort.key];

  return [...items].sort((firstItem, secondItem) => compareValues(getSortValue(firstItem), getSortValue(secondItem)) * sortMultiplier);
}

export function paginateTableItems<TItem>(items: readonly TItem[], pageIndex: number, pageSize: number): readonly TItem[] {
  const start = (pageIndex - 1) * pageSize;

  return items.slice(start, start + pageSize);
}

function compareValues(firstValue: TableSortValue, secondValue: TableSortValue): number {
  if (typeof firstValue === 'number' && typeof secondValue === 'number') {
    return firstValue - secondValue;
  }

  return String(firstValue).localeCompare(String(secondValue));
}
