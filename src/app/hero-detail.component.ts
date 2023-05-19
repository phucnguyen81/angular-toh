import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BaseComponent } from './base.component';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent extends BaseComponent implements OnInit {
  @Input() hero: Hero = new Hero();  // the hero to edit or create
  @Input() saveHeroComplete = () => {
    // called after a hero is created successfully
    // do nothing by default
  };
  @Input() editMode = false;  // edit or create?

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) { super(); }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      // If a hero id is provided, we are editing an existing hero.
      if (params['id'] !== undefined) {
        const id = +params['id'];  // convert id to number
        this.editMode = true;
        this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
      }
    });
  }

  save(): void {
    this.subUntilDestroy(this.heroService.save(this.hero), {
      next: (hero) => {
        this.hero = hero;  // saved hero, with id if new
        this.saveHeroComplete();
        if (this.editMode) { this.goBack(); }
      }
    });
  }

  goBack(): void {
    window.history.back();
  }
}
