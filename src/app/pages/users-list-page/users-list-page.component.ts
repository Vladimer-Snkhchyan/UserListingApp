import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { PaginatorIntlService } from '../../services/paginator-intl.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [MatIconModule, MatPaginatorModule, MatMenuModule],
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }]
})
export class UsersListPageComponent implements OnInit { 
  users: User[] = [];
  length!: number;
  current_page: number = 0;
  page_size: number = 5;
  page_size_options: number[] = [1, 5, 10];
  paginatedUsers: User[] = [];
  url_to_db!: string;

  constructor(private router: Router, private http: HttpClient) { };

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() { // Fetch data from the JSON file
    this.url_to_db = './assets/db/users.json'


    this.http.get<User[]>(this.url_to_db ).subscribe(
      data => {
        this.users = data;
        this.length = this.users.length;
        this.updatePaginatedUsers();
      },
    );
  }

  updatePaginatedUsers() {
    const start = this.current_page * this.page_size;
    const end = start + this.page_size;
    this.paginatedUsers = this.users.slice(start, end);
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.current_page = pageEvent.pageIndex;
    this.page_size = pageEvent.pageSize;
    this.updatePaginatedUsers();
  }

  openActionPanel() {

  }
  onActionEdit (user_id: number) {
    this.router.navigate(['/user/details/', user_id]);
  }

  onActionCancel () {

  }

  add_new_user() {
    this.router.navigate(['/user/details/']);
  }
}