import { Injectable, signal } from '@angular/core';

import { Hero } from './hero';

@Injectable()
export class AppContextService {
  readonly hero = signal<Hero | null>(null);
}
