import { Component, model } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { TEAM_MEMBERS } from '../../../../shared/data/team-members';
import { injectTableFilters } from '../../../../shared/table-state/filters/table-filters.feature';
import { CUSTOMER_COUNTRIES } from '../../models/customer-countries';
import type { ICustomerFilters } from '../../models/customer-filters.interface';
import { CustomerPlan } from '../../models/customer-plan.enum';
import { CUSTOMERS_FILTERS_SCHEMA } from './customers-filters.schema';

@Component({
  selector: 'fd-customers-filters',
  imports: [FormField, NzButtonModule, NzIconModule, NzInputModule, NzSelectModule],
  templateUrl: './customers-filters.component.html',
  styleUrl: './customers-filters.component.scss',
})
export class CustomersFiltersComponent {
  readonly filters = model.required<ICustomerFilters>();

  protected readonly customerPlan = CustomerPlan;
  protected readonly teamMembers = TEAM_MEMBERS;
  protected readonly countries = CUSTOMER_COUNTRIES;

  private readonly _tableFilters = injectTableFilters(this.filters, CUSTOMERS_FILTERS_SCHEMA);

  protected readonly filtersForm = this._tableFilters.form;

  protected resetFilters(): void {
    this._tableFilters.reset();
  }
}
