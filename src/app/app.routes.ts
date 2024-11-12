import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const routes: Routes = [
    {'path': '', component:HomePageComponent},
    {'path': 'users/list', component: UsersListPageComponent},
    {'path': 'user/details', component: UserDetailsPageComponent},
    {'path': 'user/details/:id', component: UserDetailsPageComponent},
    {'path': '**', component: ErrorPageComponent }
];
