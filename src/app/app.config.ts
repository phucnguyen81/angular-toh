import { InjectionToken } from '@angular/core';

export interface AppConfig {
  title: string;
}

// since the interface AppConfig is not available at runtime,
// we need to use a token to identify it at runtime
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const DEFAULT_CONFIG: AppConfig = {
  title: 'Angular Lab',
};
