import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  _destination!: string;

  constructor(private router: Router) {};

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the router URL to set the destination
        if (this.router.url === '/') {
          this._destination = 'Home';
        } else if (this.router.url.endsWith('/users/list')) {
          this._destination = 'Users List';
        } else if (this.router.url.includes('/user/details')) {
          this._destination = 'User Details';
        } else {
          this._destination = 'You are lost';
        }
      }
    });
  }

  move_to_home() {   
    this.router.navigate(['/']);
    this._destination = 'Home';
   };

  move_to_users_list() {   
    this.router.navigate(['/users/list']);
    this._destination = 'Users List';
   }

  get destination() { return this._destination};

}
