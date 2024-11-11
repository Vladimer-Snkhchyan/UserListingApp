import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { UserManagementService } from '../services/user-management.service';
import { User } from '../interfaces/user';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Testing User Menagement service', () => {
  let service: UserManagementService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    {
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
      recitations: "Dance, Photography, Sketching"
    },
    {
      id: 4,
      first_name: "Daniel",
      middle_name: "James",
      last_name: "Garcia",
      email: "daniel.garcia@example.com",
      status: true,
      date_of_birth: "2000-02-14T00:00:00.000Z",
      is_activated: true,
      profile_img_url: "https://example.com/images/daniel.jpg",
      phone_number: "+34-655-555-0188",
      gender: true,
      main_language: "Spanish",
      nationality: "Spanish",
      recitations: "Basketball, Cooking, Hiking"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManagementService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(UserManagementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should return the correct user when getUserById is called', (done) => {
    const userId = 3;
    service.getUserById(userId).subscribe((user) => {
      expect(user).toEqual(mockUsers[0]);
      done();
    });

   const req = httpMock.expectOne('./assets/db/users.json');
   expect(req.request.method).toEqual('GET');
   req.flush(mockUsers);
  });

  it('Should return undefined if the user is not found', (done) => {
    const userId = 5; 
    service.getUserById(userId).subscribe((user) => {
      expect(user).toBeUndefined();
      done();
    });

    const req = httpMock.expectOne('./assets/db/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); 
  });
});