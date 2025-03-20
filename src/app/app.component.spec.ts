import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser'; // Added for better DOM querying

// Mock HeaderComponent
@Component({
  selector: 'app-header',
  standalone: true,
  template: ''
})
class MockHeaderComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
}

// Mock SidebarComponent
@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: ''
})
class MockSidebarComponent { }

// Mock DashboardComponent
@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: ''
})
class MockDashboardComponent { }

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MatSidenavModule,
        BrowserAnimationsModule,
        SharedModule,
        DashboardModule,
        MockHeaderComponent,
        MockSidebarComponent,
        MockDashboardComponent,
        StoreModule.forRoot({}),
        HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial rendering
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with sidebar open', () => {
    expect(component.isSidebarOpen).toBeTrue();
  });

  describe('toggleSidebar', () => {
    it('should toggle sidebar from open to closed', () => {
      component.isSidebarOpen = true;
      component.toggleSidebar();
      expect(component.isSidebarOpen).toBeFalse();
    });

    it('should toggle sidebar from closed to open', () => {
      component.isSidebarOpen = false;
      component.toggleSidebar();
      expect(component.isSidebarOpen).toBeTrue();
    });
  });

  describe('template', () => {
    it('should render header component', () => {
      const headerElement = fixture.nativeElement.querySelector('app-header');
      expect(headerElement).toBeTruthy();
    });

    it('should render sidebar component inside mat-sidenav', () => {
      const sidebarElement = fixture.nativeElement.querySelector('mat-sidenav app-sidebar');
      expect(sidebarElement).toBeTruthy();
    });

    it('should render dashboard component inside mat-sidenav-content', () => {
      const dashboardElement = fixture.nativeElement.querySelector('mat-sidenav-content app-dashboard');
      expect(dashboardElement).toBeTruthy();
    });

    it('should bind isSidebarOpen to mat-sidenav opened property', () => {
      const sidenavElement = fixture.nativeElement.querySelector('mat-sidenav');
      expect(sidenavElement.getAttribute('ng-reflect-opened')).toBe('true');

      component.isSidebarOpen = false;
      fixture.detectChanges();
      expect(sidenavElement.getAttribute('ng-reflect-opened')).toBe('false');
    });

    it('should call toggleSidebar when header emits sidebarToggle event', () => {
      const spy = spyOn(component, 'toggleSidebar');

      // Use By.css to find the app-header component
      const headerDebugElement = fixture.debugElement.query(By.css('app-header'));
      expect(headerDebugElement).toBeTruthy(); // Ensure we found the element

      const headerComponent = headerDebugElement.componentInstance as MockHeaderComponent;
      headerComponent.sidebarToggle.emit();

      expect(spy).toHaveBeenCalled();
    });

    it('should have correct sidenav mode', () => {
      const sidenavElement = fixture.nativeElement.querySelector('mat-sidenav');
      expect(sidenavElement.getAttribute('ng-reflect-mode')).toBe('side');
    });

    it('should apply custom-sidebar class to mat-sidenav', () => {
      const sidenavElement = fixture.nativeElement.querySelector('mat-sidenav');
      expect(sidenavElement.classList.contains('custom-sidebar')).toBeTrue();
    });

    it('should have app-container class on root div', () => {
      const containerElement = fixture.nativeElement.querySelector('.app-container');
      expect(containerElement).toBeTruthy();
    });
  });
});