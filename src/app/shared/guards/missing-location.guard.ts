import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';

import { GeolocationService } from '@geolocation/services/geolocation.service';

export const MissingLocationGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const router = inject(Router);

  const geolocationService = inject(GeolocationService);

  const hasLocation = geolocationService.hasLocation();

  if (!hasLocation) {
    router.navigateByUrl('/location');
    return false;
  }

  return true;
};
