import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'fd-cases-page',
  imports: [NzButtonModule],
  templateUrl: './cases-page.component.html',
  styleUrl: './cases-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesPageComponent {}
