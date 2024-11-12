import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { Layout1Component } from '../components/layout1/layout1.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Layout1Component', () => {
  let component: Layout1Component;
  let fixture: ComponentFixture<Layout1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterOutlet,RouterTestingModule],
      providers: [Layout1Component]
  }).compileComponents();

    fixture = TestBed.createComponent(Layout1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});