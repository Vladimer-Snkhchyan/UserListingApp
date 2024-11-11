import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../services/user-management.service';
import { UserDetailsPageComponent } from '../pages/user-details-page/user-details-page.component';
import { User } from '../interfaces/user';
import { FormControl } from '@angular/forms';

describe('UserDetailsPageComponent', () => {
  let component: UserDetailsPageComponent;
  let userManagementServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(() => {
    activatedRouteMock = {
      queryParams: of({ id: 3 })
    };

    userManagementServiceMock = {
      getUserById: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: UserManagementService, useValue: userManagementServiceMock }
      ]
    });

    component = new UserDetailsPageComponent(activatedRouteMock, userManagementServiceMock);

    // const fixture = TestBed.createComponent(UserDetailsPageComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();  // Trigger initial lifecycle hooks
  
});

  describe('ngOnInit', () => {
    it('should set id from route parameters and call checkId', () => {
      jest.spyOn(component, 'checkId');
      component.ngOnInit();

      expect(component.id).toBe(3);
      expect(component.checkId).toHaveBeenCalled();
    });
  });

  describe('checkId', () => {


    it('Should set user and call fillForm if user is found', () => {
      const mockUser: User =   {
        id: 3,
        first_name: "Claire",
        middle_name: "Ann",
        last_name: "Brown",
        email: "claire.brown@example.com",
        status: true,
        date_of_birth: "1993-11-05T00:00:00.000Z",
        is_activated: true,
        profile_img_url: "https://example.com/images/claire.jpg",
        phone_number: "+44-789-555-0123",
        gender: false,
        main_language: "French",
        nationality: "British",
        recitations: "Dance, Photography, Sketching",
      };

      userManagementServiceMock.getUserById.mockReturnValue(of(mockUser));
      jest.spyOn(component, 'fillForm');
      
      component.checkId();

      expect(component.user).toEqual(mockUser);
      expect(component.is_new_user).toBe(false);
      expect(component.fillForm).toHaveBeenCalledWith(mockUser);
    });

    it('Should set is_new_user to true if user is not found', () => {
      userManagementServiceMock.getUserById.mockReturnValue(of(undefined));
      
      component.checkId();

      expect(component.user).toBeUndefined();
      expect(component.is_new_user).toBe(true);
    });

    it('Should log error when user retrieval fails', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      userManagementServiceMock.getUserById.mockReturnValue(throwError('Error fetching user'));

      component.checkId();

      expect(consoleSpy).toHaveBeenCalledWith('Error fetching user:', 'Error fetching user');
      consoleSpy.mockRestore();
    });
  });

  describe('Filling form with mockdata', () => {
    it('Should populate form controls with user data', () => {
        const mockUser: User =   {
            id: 3,
            first_name: "Claire",
            middle_name: "Ann",
            last_name: "Brown",
            email: "claire.brown@example.com",
            status: true,
            date_of_birth: "1993-11-05T00:00:00.000Z",
            is_activated: true,
            profile_img_url: "https://example.com/images/claire.jpg",
            phone_number: "+44-789-555-0123",
            gender: false,
            main_language: "French",
            nationality: "British",
            recitations: "Dance, Photography, Sketching",
          };

      component.fillForm(mockUser);

      expect(component.email.value).toBe(mockUser.email);
      expect(component.first_name.value).toBe(mockUser.first_name);
      expect(component.middle_name.value).toBe(mockUser.middle_name);
      expect(component.last_name.value).toBe(mockUser.last_name);

      const date = new Date(mockUser.date_of_birth);
      const formattedDate = date.toISOString().split('T')[0]
  
      expect(component.date_of_birth.value).toBe(formattedDate);
      expect(component.gender.value).toBe(mockUser.gender);
      expect(component.is_activated.value).toBe(mockUser.is_activated);
      expect(component.profile_img_url.value).toBe(mockUser.profile_img_url);
      expect(component.phone_number.value).toBe(mockUser.phone_number);
      expect(component.main_language.value).toBe(mockUser.main_language);
      expect(component.nationality.value).toBe(mockUser.nationality);
      expect(component.recitations.value).toBe(mockUser.recitations);
    });
  });

  describe('Submit button', () => {
    it('Should call createNewUser if is_new_user is true', () => {
      component.is_new_user = true;
      jest.spyOn(component, 'createNewUser');

      component.submit();

      expect(component.createNewUser).toHaveBeenCalled();
    });

    it('Should call updateUser if is_new_user is false', () => {
      component.is_new_user = false;
      jest.spyOn(component, 'updateUser');

      component.submit();

      expect(component.updateUser).toHaveBeenCalled();
    });
  });
});