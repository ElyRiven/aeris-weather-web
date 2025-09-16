import { Routes } from '@angular/router';

import { LocationPageComponent } from './pages/location-page/location-page.component';
import { ForecastPageComponent } from './pages/forecast-page/forecast-page.component';
import { WebFrontLayoutComponent } from './layouts/web-front-layout/web-front-layout.component';
import { MissingLocationGuard } from '@shared/guards/missing-location.guard';
import { DetailsPageComponent } from './pages/details-page/details-page.component';

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
        children: [
          {
            path: '',
            component: ForecastPageComponent,
            canMatch: [MissingLocationGuard],
          },
          {
            path: 'details/:date',
            component: DetailsPageComponent,
          },
        ],
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
