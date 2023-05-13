import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, of } from 'rxjs';
import * as op from 'rxjs/operators';

import { AppAlertService } from './app-alert.service';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent {
  readonly searchTerms = new Subject<string>();

  // hero outputs are driven entirely from user search inputs
  readonly heroes = this.searchTerms.pipe(
    op.filter(term => !!term), // ignore empty search terms
    op.debounceTime(300), // wait for 300ms pause in events
    op.distinctUntilChanged(), // ignore if next search term is same as previous
    op.switchMap(term => this.heroService.search(term)), // switch to the heroes observable
    op.catchError(() => {
      this.alert.open(`Search error ...`);
      return of<Hero[]>([]);
    })
  );

  constructor(
    private heroService: HeroService,
    private router: Router,
    private alert: AppAlertService,
  ) { }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
