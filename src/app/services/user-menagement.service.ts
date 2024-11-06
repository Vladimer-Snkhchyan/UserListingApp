import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMenagementService {
  users_url = './assets/db/users.json'

  constructor(private http: HttpClient) {};

  getUserById(userId: number): Observable<User | undefined> {
    return this.http.get<User[]>(this.users_url).pipe(
      map(users => users.find(user => user.id === userId))
    );
  }
}
