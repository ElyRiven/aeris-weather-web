import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';

import { GeolocationService } from '@geolocation/services/geolocation.service';

export const MissingLocationGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const geolocationService = inject(GeolocationService);

  const hasLocation = geolocationService.hasLocation();

  if (!hasLocation) {
    return false;
  }

  return true;
};
