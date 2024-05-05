import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AppContextService } from './app-context.service';
import { BaseComponent } from './base.component';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent extends BaseComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly appContext = inject(AppContextService);
  private readonly heroService = inject(HeroService);

  heroes: Hero[] = [];

  addingHero = signal<boolean>(false);

  lastSelectedHero = signal<Hero | null>(this.appContext.hero());

  selectedHero = computed<Hero | null>(() => (
    this.addingHero() ? null : this.lastSelectedHero()
  ));

  error: object | null = null;

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.subUntilDestroy(this.heroService.getHeroes(), {
      next: heroes => (this.heroes = heroes),
      error: error => (this.error = error),
    });
  }

  get loading(): boolean {
    return this.heroService.loading();
  }

  onSelect(hero: Hero): void {
    this.lastSelectedHero.set(hero);
  }

  isSelected(hero: Hero): boolean {
    return hero?.id == this.lastSelectedHero()?.id;
  }

  gotoDetail(hero: Hero): void {
    this.router.navigate(['/detail', hero.id]);
  }

  addHero(): void {
    this.addingHero.set(true);
  }

  saveHeroComplete = () => {
    this.addingHero.set(false);
    this.getHeroes();
  }

  deleteHero(hero: Hero, event: Event): void {
    event.stopPropagation();
    this.heroService.delete(hero).subscribe({
      next: () => {
        if (this.lastSelectedHero() === hero) {
          this.lastSelectedHero.set(null);
        }
        const idx = this.heroes.findIndex(h => h.id === hero.id);
        if (idx >= 0) {
          this.heroes.splice(idx, 1);
        }
      },
      error: error => (this.error = error),
    });
  }
}
