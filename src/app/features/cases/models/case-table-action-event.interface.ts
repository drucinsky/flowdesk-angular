import { type ICaseTableRow } from './case-table-row.interface';

export type CaseTableAction = 'close';

export interface ICaseTableActionEvent {
  action: CaseTableAction;
  item: ICaseTableRow;
}
