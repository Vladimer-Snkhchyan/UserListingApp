import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TopBarComponent } from '../general/top-bar/top-bar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TopBarComponent, RouterTestingModule]
    });
    router = TestBed.inject(Router);
    component = TestBed.createComponent(TopBarComponent).componentInstance;
  });

  describe('Initialization', () => {
    
    it('should set destination to "Home" if router.url is "/"', () => {
      jest.spyOn(router, 'url', 'get').mockReturnValue('/');
      component = new TopBarComponent(router); 
      expect(component.destination).toBe('Home');
    });

    it('should set destination to "Users List" if router.url is "/users_list"', () => {
      jest.spyOn(router, 'url', 'get').mockReturnValue('/users_list');
      component = new TopBarComponent(router);
      expect(component.destination).toBe('Users List');
    });
  });

  describe('openUsersList', () => {
    it('should set destination to "Users List"', () => {
      component.openUsersList();
      expect(component.destination).toBe('Users List');
    });
  });

  describe('openMainPage', () => {
    it('should set destination to "Home"', () => {
      component.openMainPage();
      expect(component.destination).toBe('Home');
    });
  });
});