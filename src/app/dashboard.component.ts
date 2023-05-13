import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from './base.component';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  readonly heroes: Hero[] = [];

  constructor(private router: Router, private heroService: HeroService) {
    super();
  }

  ngOnInit(): void {
    this.subUntilDestroy(this.heroService.getHeroes(), {
      next: (heroes) => {
        const heroesToShow = Math.min(4, heroes.length);
        this.heroes.length = 0;
        for (let i = 0; i < heroesToShow; i++) {
          const randomPos = Math.floor(Math.random() * heroes.length);
          const randomHero = heroes.splice(randomPos, 1)[0];
          this.heroes.push(randomHero);
        }
      }
    });
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
