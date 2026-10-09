import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { CustomersService } from '../../data-access/customers.service';
import { mapCustomerDetailsToView } from '../../mappers/customer-details.mapper';
import type { ICustomerTableRow } from '../../models/customer-table-row.interface';

@Component({
  selector: 'fd-customer-details',
  imports: [NzSkeletonModule, NzTagModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent {
  private readonly _customersService = inject(CustomersService);

  readonly customer = input.required<ICustomerTableRow>();

  private readonly _detailsResource = rxResource({
    params: () => this.customer().id,
    stream: ({ params }) => this._customersService.getCustomerDetails(params),
  });

  protected readonly isLoading = this._detailsResource.isLoading;
  protected readonly hasError = computed(() => this._detailsResource.status() === 'error');
  protected readonly details = computed(() => {
    const details = this._detailsResource.hasValue() ? this._detailsResource.value() : undefined;

    return details ? mapCustomerDetailsToView(details) : undefined;
  });
}
