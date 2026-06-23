import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { APP_NAVIGATION_ITEMS } from '../../config/app-navigation.config';

@Component({
  selector: 'fd-sidebar',
  imports: [RouterLink, RouterLinkActive, NzButtonModule, NzIconModule, NzMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly isCollapsed = input.required<boolean>();
  readonly collapseToggle = output<void>();

  protected readonly navigationItems = APP_NAVIGATION_ITEMS;

  protected onCollapseToggle(): void {
    this.collapseToggle.emit();
  }
}
