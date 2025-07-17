import { Routes } from '@angular/router';
import { WebFrontLayoutComponent } from './layouts/web-front-layout/web-front-layout.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';

export const WebFrontRoutes: Routes = [
  {
    path: '',
    component: WebFrontLayoutComponent,
    children: [
      {
        path: 'location',
        component: LocationPageComponent,
      },
      {
        path: '**',
        redirectTo: 'location',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'location',
  },
];

export default WebFrontRoutes;
