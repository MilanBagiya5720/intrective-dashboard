import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { SharedModule } from '../../shared/shared.module';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, SharedModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit navClick event with correct route when onNavClick is called', () => {
    spyOn(component.navClick, 'emit');
    const testRoute = '/dashboard';

    component.onNavClick(testRoute);

    expect(component.navClick.emit).toHaveBeenCalledWith(testRoute);
  });
});