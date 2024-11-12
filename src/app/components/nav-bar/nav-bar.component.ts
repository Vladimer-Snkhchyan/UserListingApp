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
  destination: string = '';

  constructor(private router: Router) {};

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the router URL to set the destination
        if (this.router.url === '/') {
          this.destination = 'Home';
        } else if (this.router.url.endsWith('/users/list')) {
          this.destination = 'Users List';
        } else if (this.router.url.includes('/user/details')) {
          this.destination = 'User Details';
        } else {
          this.destination = 'You are lost';
        }
      }
    });
  }

  move_to_home() {   
    this.router.navigate(['/']);
    this.destination = 'Home';
   };

  move_to_users_list() {   
    this.router.navigate(['/users/list']);
    this.destination = 'Users List';
   }

}
