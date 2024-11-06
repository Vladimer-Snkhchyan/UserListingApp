import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { Layout1Component } from './common_ui/layout1/layout1.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const routes: Routes = [
    {'path': '' , component: Layout1Component, children: [
        {'path':'', component:HomePageComponent},
        {'path':'users/list', component: UsersListPageComponent},
    ]},
    {'path': 'users/details/add', component: UserDetailsPageComponent},
    {'path': 'users/details/update', component: UserDetailsPageComponent},
    {'path': '**', component: ErrorPageComponent }
];
