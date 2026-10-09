import { type CaseStatus } from '../../models/case-status.enum';

export interface ICloseCaseModalData {
  readonly caseId: string;
  readonly caseNumber: string;
  readonly currentStatus: CaseStatus;
}

export interface ICloseCaseModalResult {
  readonly closed: boolean;
  readonly caseId: string;
}

export interface ICloseCaseFormValue {
  readonly reason: string;
  readonly notifyClient: boolean;
}
