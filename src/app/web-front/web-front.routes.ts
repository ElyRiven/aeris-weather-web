import { Routes } from '@angular/router';
import { WebFrontLayoutComponent } from './layouts/web-front-layout/web-front-layout.component';

export const WebFrontRoutes: Routes = [
  {
    path: '',
    component: WebFrontLayoutComponent,
    // children: [
    //   {
    //     path: 'location',
    //   },
    // ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default WebFrontRoutes;
