import { DOCUMENT } from '@angular/common';
import { Component, Injector, afterNextRender, effect, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { TableSelectionBarComponent } from '../../../../shared/table-state/components/table-selection-bar/table-selection-bar.component';
import { TableSortDirective } from '../../../../shared/table-state/directives/table-sort.directive';
import { TableStateDirective } from '../../../../shared/table-state/directives/table-state.directive';
import { CustomersFacade } from '../../customers.facade';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'fd-customers-table',
  imports: [
    CustomerDetailsComponent,
    FormField,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzTableModule,
    NzTagModule,
    NzTooltipModule,
    TableSelectionBarComponent,
    TableStateDirective,
    TableSortDirective,
  ],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss',
})
export class CustomersTableComponent {
  protected readonly facade = inject(CustomersFacade);
  protected readonly editButtonIdPrefix = 'customer-edit-';

  private readonly _document = inject(DOCUMENT);
  private readonly _injector = inject(Injector);

  // The edit buttons are replaced by Save/Cancel while editing, so the focus has to be returned to the edited row's button.
  private readonly _restoreFocusAfterEdit = effect(() => {
    const editEnded = this.facade.editEnded();

    if (editEnded === null) {
      return;
    }

    afterNextRender(
      () => {
        this._document.getElementById(this.editButtonIdPrefix + editEnded.rowId)?.focus();
      },
      { injector: this._injector },
    );
  });
}
