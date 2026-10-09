import type { IAppModalDefinition } from '../../../../modal/modal.definition';
import { ExportScopeModalComponent } from './export-scope-modal.component';
import type { IExportScopeModalData, IExportScopeModalResult } from './export-scope-modal.types';

export const EXPORT_SCOPE_MODAL: IAppModalDefinition<IExportScopeModalData, IExportScopeModalResult> = {
  key: 'table.export-scope',
  component: ExportScopeModalComponent,
  title: 'Export to CSV',
  width: 480,
  className: 'fd-export-scope-modal',
  maskClosable: false,
};
