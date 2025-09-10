import { Routes } from '@angular/router';
import { WebFrontLayoutComponent } from './layouts/web-front-layout/web-front-layout.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';
import { ForecastPageComponent } from './pages/forecast-page/forecast-page.component';

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
        path: 'forecast',
        component: ForecastPageComponent,
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
