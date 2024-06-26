import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { BaseComponent } from '../base.component';
import { Hero } from '../hero';
import { HERO_SERVICE, HeroService } from '../hero.service';
import { AppContextService } from '../app-context.service';

/**
 * This is a standalone component that does not belong to any modules. Since it
 * is standalone, it needs to explicitly import other components/modules to use
 * them. Also, other components/modules need to import this to use it.
 */
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class HeroDetailComponent extends BaseComponent implements OnInit {
  private readonly heroService = inject<HeroService>(HERO_SERVICE);

  private appContext: AppContextService = inject(AppContextService);

  // The hero to edit or create
  @Input() hero: Hero = new Hero();

  @Input() saveHeroComplete = () => {
    // Called after a hero is created successfully
    // Do nothing by default
  };

  // Is this used to edit or create a hero?
  @Input() editMode = false;

  constructor(private route: ActivatedRoute) { super(); }

  ngOnInit(): void {
    // fetch the hero to edit from route parameter
    this.route.params.forEach((params: Params) => {
      // If a hero id is provided, we are editing an existing hero.
      if (params['id'] !== undefined) {
        const id = +params['id'];  // convert id to number
        this.editMode = true;
        this.heroService.getHero(id).subscribe((hero) => {
          this.hero = hero;
          this.appContext.hero.set(hero);
        });
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
