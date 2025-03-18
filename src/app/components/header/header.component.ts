import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() sidebarToggle = new EventEmitter<void>();

  onToggleSidebar() {
    this.sidebarToggle.emit();
  }
}
