import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');
export const AppConfig = {
  ACCOUNT: 'account',
  PROFILES: 'profiles',
  FAVORITES: 'favorites'
}
