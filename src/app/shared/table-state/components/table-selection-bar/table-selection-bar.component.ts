import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { injectTableSelection } from '../../features/selection/with-selection.feature';

/**
 * Floating bar with the number of selected rows. Table specific bulk actions are projected into it.
 * Place it inside a positioned container (e.g. `.fd-data-table-card`).
 */
@Component({
  selector: 'fd-table-selection-bar',
  imports: [NzButtonModule],
  templateUrl: './table-selection-bar.component.html',
  styleUrl: './table-selection-bar.component.scss',
})
export class TableSelectionBarComponent {
  protected readonly selection = injectTableSelection<unknown>();
}
