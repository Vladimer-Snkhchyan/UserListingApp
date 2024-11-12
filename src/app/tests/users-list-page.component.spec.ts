import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UsersListPageComponent } from "../pages/users-list-page/users-list-page.component";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { PageEvent } from "@angular/material/paginator";
import { User } from "../interfaces/user";
import { Router } from "@angular/router";

describe ('Users List Page', () => { 
    let fixture: ComponentFixture<UsersListPageComponent>;
    let component: UsersListPageComponent;
    let httpMock: HttpTestingController;
    let routerSpy = {navigate: jest.fn()}

    beforeEach (() => { 
        TestBed.configureTestingModule(
        {
            providers: [
                provideHttpClient(), provideHttpClientTesting(), {provide: Router, useValue: routerSpy}
            ]
        }
        );

        fixture = TestBed.createComponent(UsersListPageComponent);
        component = fixture.componentInstance;
        httpMock = TestBed.inject(HttpTestingController);

        jest.clearAllMocks();

    });

    it('Check the loadUsers() to run properly in ngOnInt', () => {
        const spyLoadUsers = jest.spyOn(component, 'loadUsers');
        component.ngOnInit();
        expect(spyLoadUsers).toHaveBeenCalled();

    });

    it('Fetch users data, then update length and paginatedUsers', () => {
        const mockUsers = [{ id: '1', name: 'User1' }, { id: '2', name: 'User2' }];
        component.loadUsers();
      
        const req = httpMock.expectOne('./assets/db/users.json');
        req.flush(mockUsers);
      
        expect(component.users).toEqual(mockUsers);
        expect(component.length).toBe(mockUsers.length);
        expect(component.paginatedUsers.length).toBeLessThanOrEqual(component.page_size);
      });

      it('Update users shown on page based on current page and page size ', () => {
        // The users content is not crucial in this case so we creating just simple data
        //@ts-ignore
        component.users = Array.from({ length: 10 }, (_, i) => ({ id: `${i + 1}`, name: `User${i + 1}` }));
        component.page_size = 5;
        component.current_page = 1;
      
        component.updatePaginatedUsers();
      
        expect(component.paginatedUsers).toEqual(component.users.slice(5, 10));
      });

      it('Update current page and page size in handlePageEvent', () => {
        const pageEvent: PageEvent = { pageIndex: 2, pageSize: 10, length: 50 };
        const spyUpdatePaginatedUsers = jest.spyOn(component, 'updatePaginatedUsers');
      
        component.handlePageEvent(pageEvent);
      
        expect(component.current_page).toBe(2);
        expect(component.page_size).toBe(10);
        expect(spyUpdatePaginatedUsers).toHaveBeenCalled();
      });

      it('Testing add new user feature with correct new id', () => {
        
        component.users = [{id: 3,
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
          }];
        component.add_new_user();   
        
        
      //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/user/details/add'], { queryParams: { id: 4 } });
      // });

      // it('Navigate to update user page with correct user id', () => {

      //   const userId = 5;
      //   component.update_user(userId);
      
      //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/user/details/update'], { queryParams: { id: userId } });
      // });

});