import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';
import { CreateNewMailComponent } from '../components/dashboard/messages/create-new-mail/create-new-mail.component';
import { InboxComponent } from '../components/dashboard/messages/inbox/inbox.component';
import { OutboxComponent } from '../components/dashboard/messages/outbox/outbox.component';
import { CreateNewCategoryComponent } from '../components/dashboard/categories/create-new-category/create-new-category.component';
import { EditCategoryComponent } from '../components/dashboard/categories/edit-category/edit-category.component';
import { CategoriesComponent } from '../components/dashboard/categories/categories/categories.component';
import { CreateNewPageComponent } from '../components/dashboard/pages/create-new-page/create-new-page.component';
import { EditPageComponent } from '../components/dashboard/pages/edit-page/edit-page.component';
import { PagesComponent } from '../components/dashboard/pages/pages/pages.component';
import { CreateNewContentComponent } from '../components/dashboard/content/create-new-content/create-new-content.component';
import { EditContentComponent } from '../components/dashboard/content/edit-content/edit-content.component';
import { ContentComponent } from '../components/dashboard/content/content/content.component';
import { InterestedComponent } from '../components/dashboard/messages/interested/interested.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'prefix',
    canActivate: [authGuard],
    children: [
      // Home
      {
        path: '',
        redirectTo: 'inbox',
        pathMatch: 'full',
      },

      // Messages
      {
        path: 'create-new-mail',
        component: CreateNewMailComponent,
        canActivate: [authGuard],
      },
      { path: 'inbox', component: InboxComponent, canActivate: [authGuard] },
      { path: 'outbox', component: OutboxComponent, canActivate: [authGuard] },
      {
        path: 'interested',
        component: InterestedComponent,
        canActivate: [authGuard],
      },

      // Categories
      {
        path: 'create-new-category',
        component: CreateNewCategoryComponent,
        canActivate: [authGuard],
      },
      {
        path: 'edit-category/:id',
        component: EditCategoryComponent,
        canActivate: [authGuard],
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [authGuard],
      },

      // Pages
      {
        path: 'create-new-page',
        component: CreateNewPageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'edit-page/:id',
        component: EditPageComponent,
        canActivate: [authGuard],
      },
      { path: 'pages', component: PagesComponent, canActivate: [authGuard] },

      // Content
      {
        path: 'create-new-content',
        component: CreateNewContentComponent,
        canActivate: [authGuard],
      },
      {
        path: 'edit-content/:id',
        component: EditContentComponent,
        canActivate: [authGuard],
      },
      {
        path: 'content',
        component: ContentComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
];
