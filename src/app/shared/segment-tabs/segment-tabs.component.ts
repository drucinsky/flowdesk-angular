import { Component, input, model } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

export interface ISegmentTab<TValue> {
  readonly label: string;
  readonly value: TValue | null;
  readonly count?: number;
  readonly tone?: 'danger' | 'warning';
}

@Component({
  selector: 'fd-segment-tabs',
  imports: [NzBadgeModule],
  templateUrl: './segment-tabs.component.html',
  styleUrl: './segment-tabs.component.scss',
})
export class SegmentTabsComponent<TValue> {
  readonly tabs = input.required<readonly ISegmentTab<TValue>[]>();
  readonly label = input<string>();
  readonly value = model<TValue | null>(null);

  protected select(value: TValue | null): void {
    this.value.set(value);
  }
}
