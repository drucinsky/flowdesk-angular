export interface IConfirmModalData {
  readonly title: string;
  readonly message: string;
  readonly confirmLabel: string;
  readonly cancelLabel?: string;
  /** Marks the confirm button as dangerous (e.g. for deleting data). */
  readonly danger?: boolean;
}

export interface IConfirmModalResult {
  readonly confirmed: true;
}
