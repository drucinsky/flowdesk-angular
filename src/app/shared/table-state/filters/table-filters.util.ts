export function areFiltersEqual(firstFilters: object, secondFilters: object): boolean {
  const firstRecord = firstFilters as Record<string, unknown>;
  const secondRecord = secondFilters as Record<string, unknown>;

  const firstKeys = Object.keys(firstRecord);
  const secondKeys = Object.keys(secondRecord);

  if (firstKeys.length !== secondKeys.length) {
    return false;
  }

  return firstKeys.every((key) => areValuesEqual(firstRecord[key], secondRecord[key]));
}

function areValuesEqual(firstValue: unknown, secondValue: unknown): boolean {
  if (Array.isArray(firstValue) && Array.isArray(secondValue)) {
    return areArraysEqual(firstValue, secondValue);
  }

  if (firstValue instanceof Date && secondValue instanceof Date) {
    return firstValue.getTime() === secondValue.getTime();
  }

  return Object.is(firstValue, secondValue);
}

function areArraysEqual(firstArray: readonly unknown[], secondArray: readonly unknown[]): boolean {
  if (firstArray.length !== secondArray.length) {
    return false;
  }

  return firstArray.every((value, index) => Object.is(value, secondArray[index]));
}
