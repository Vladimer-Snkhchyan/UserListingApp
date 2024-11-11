import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';



describe('App Component Test', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should have the correct title', () => {
    fixture.detectChanges();
    expect(component.title).toBe('UserListingProject');
  });
});