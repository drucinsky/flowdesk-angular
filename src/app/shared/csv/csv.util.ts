export type CsvValue = string | number | boolean | null | undefined;

export interface ICsvColumn<TRow> {
  readonly header: string;
  readonly value: (row: TRow) => CsvValue;
}

export interface ICsvOptions {
  /** Excel with a Polish regional setting expects `;`. Defaults to `;`. */
  readonly delimiter?: ';' | ',';
  /** UTF-8 BOM makes Excel read the file as UTF-8 (Polish characters). Defaults to `true`. */
  readonly bom?: boolean;
}

const UTF8_BOM = '﻿';
const LINE_BREAK = '\r\n';
const FORMULA_PREFIX = /^[=+\-@\t\r]/;

export function buildCsv<TRow>(columns: readonly ICsvColumn<TRow>[], rows: readonly TRow[], options: ICsvOptions = {}): string {
  const delimiter = options.delimiter ?? ';';

  const headerLine = columns.map((column) => escapeCell(column.header, delimiter)).join(delimiter);
  const rowLines = rows.map((row) => columns.map((column) => escapeCell(column.value(row), delimiter)).join(delimiter));

  return `${options.bom === false ? '' : UTF8_BOM}${[headerLine, ...rowLines].join(LINE_BREAK)}${LINE_BREAK}`;
}

function escapeCell(value: CsvValue, delimiter: string): string {
  if (value === null || value === undefined) {
    return '';
  }

  // Text starting with =, +, - or @ could be executed as a formula by spreadsheet software (CSV injection).
  const text = typeof value === 'string' && FORMULA_PREFIX.test(value) ? `'${value}` : String(value);

  return text.includes(delimiter) || /["\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}
