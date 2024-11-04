import {Component } from '@angular/core';
import { User } from '../../interfaces/user';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule,MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import { PaginatorIntlService } from '../../services/paginator-intl.service';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [MatIconModule, MatPaginatorModule],
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss',
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorIntlService}]
})
export class UsersListPageComponent {
  users: User[] = [];
  length!: number;
  current_page: number = 0;
  page_size: number = 5;
  page_size_options: number[] = [1, 5, 10];
  paginatedUsers: User[] = [];

  constructor() {

    this.users = [
      {
        id: 1,
        first_name: 'Alice',
        middle_name: 'Marie',
        last_name: 'Johnson',
        email: 'alice.johnson@example.com',
        status: true,
        date_of_birth: new Date('1990-04-15'),
        is_activated: true,
        profile_img_url: 'https://example.com/images/alice.jpg',
        phone_number: '+1-202-555-0123',
        gender: false,
        main_language: 'English',
        nationality: 'American',
        recitations: 'Reading, Writing, Public Speaking',
      },
      {
        id: 2,
        first_name: 'Ben',
        middle_name: 'Edward',
        last_name: 'Thompson',
        email: 'ben.thompson@example.com',
        status: false,
        date_of_birth: new Date('1985-07-22'),
        is_activated: false,
        profile_img_url: 'https://example.com/images/ben.jpg',
        phone_number: '+1-303-555-0199',
        gender: true,
        main_language: 'English',
        nationality: 'Canadian',
        recitations: 'Chess, Music, Coding',
      },
      {
        id: 3,
        first_name: 'Claire',
        middle_name: 'Ann',
        last_name: 'Brown',
        email: 'claire.brown@example.com',
        status: true,
        date_of_birth: new Date('1993-11-05'),
        is_activated: true,
        profile_img_url: 'https://example.com/images/claire.jpg',
        phone_number: '+44-789-555-0123',
        gender: false,
        main_language: 'French',
        nationality: 'British',
        recitations: 'Dance, Photography, Sketching',
      },
      {
        id: 4,
        first_name: 'Daniel',
        middle_name: 'James',
        last_name: 'Garcia',
        email: 'daniel.garcia@example.com',
        status: true,
        date_of_birth: new Date('2000-02-14'),
        is_activated: true,
        profile_img_url: 'https://example.com/images/daniel.jpg',
        phone_number: '+34-655-555-0188',
        gender: true,
        main_language: 'Spanish',
        nationality: 'Spanish',
        recitations: 'Basketball, Cooking, Hiking',
      },
    ];
    this.length = this.users.length;
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers() {
    const start = this.current_page * this.page_size;
    const end = start + this.page_size;
    this.paginatedUsers = this.users.slice(start, end);
  }


  handlePageEvent (pageevent: PageEvent) {
    this.current_page = pageevent.pageIndex;
    this.page_size = pageevent.pageSize;
    this.updatePaginatedUsers();
  }

  add_new_user() {
    console.log('New user was add')
  }
  
}
