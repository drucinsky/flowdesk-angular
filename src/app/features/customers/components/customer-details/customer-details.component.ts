import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { CustomersFacade } from '../../customers.facade';
import type { ICustomerTableRow } from '../../models/customer-table-row.interface';

@Component({
  selector: 'fd-customer-details',
  imports: [NzSkeletonModule, NzTagModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent {
  private readonly _facade = inject(CustomersFacade);

  readonly customer = input.required<ICustomerTableRow>();

  private readonly _detailsResource = rxResource({
    params: () => this.customer().id,
    stream: ({ params }) => this._facade.loadDetails(params),
  });

  protected readonly isLoading = this._detailsResource.isLoading;
  protected readonly hasError = computed(() => this._detailsResource.status() === 'error');
  protected readonly details = computed(() => (this._detailsResource.hasValue() ? this._detailsResource.value() : undefined));
}
