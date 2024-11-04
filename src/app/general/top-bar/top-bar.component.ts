import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
    destination!: string;

    constructor(private router : Router) {
      if(this.router.url === '/' ) {
        this.destination = 'Home';
      }
      else if(this.router.url ==='/users_list') {
        this.destination = 'Users List';
      }
    }

    openUsersList () {
      this.destination = 'Users List';
    };

    openMainPage() {
      this.destination =  'Home';

    };
}
