import { Component, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from './base.component';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent extends BaseComponent implements OnInit {
  heroes: Hero[] = [];
  addingHero = signal<boolean>(false);
  lastSelectedHero = signal<Hero | null>(null);
  selectedHero = computed<Hero | null>(() => (
    this.addingHero() ? null : this.lastSelectedHero()
  ));
  error: any;
  showNgFor = false;

  constructor(private router: Router, private heroService: HeroService) { super(); }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.subUntilDestroy(this.heroService.getHeroes(), {
      next: heroes => (this.heroes = heroes),
      error: error => (this.error = error),
    });
  }

  onSelect(hero: Hero): void {
    this.lastSelectedHero.set(hero);
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

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroService.delete(hero).subscribe({
      next: (res) => {
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
