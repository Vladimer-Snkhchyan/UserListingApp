import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { of } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    // Create a mock Router
    mockRouter = {
      events: of(new NavigationEnd(1, '/', '/')), // Mocking a NavigationEnd event
      navigate: jest.fn(), // Mocking the navigate method
      url: '/' // Mocking the current URL
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter } // Provide the mockRouter as the Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the NavBar component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize destination as Home when navigating to root', () => {
    component.ngOnInit();
    expect(component.destination).toBe('Home');
  });

  it('should navigate to Home and set destination to "Home" when move_to_home is called', () => {
    const navigateSpy = jest.spyOn(mockRouter, 'navigate');
    component.move_to_home();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
    expect(component.destination).toBe('Home');
  });

  it('should navigate to Users List and set destination to "Users List" when move_to_users_list is called', () => {
    const navigateSpy = jest.spyOn(mockRouter, 'navigate');
    component.move_to_users_list();
    expect(navigateSpy).toHaveBeenCalledWith(['/users/list']);
    expect(component.destination).toBe('Users List');
  });
});