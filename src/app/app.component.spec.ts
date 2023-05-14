import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLElement;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [AppModule]
  })));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have correct title', () => {
    expect(compiled.querySelector('h1.title')?.textContent).toContain(app.title);
  });

  it('should redirect to Dashboard page on initial navigation', waitForAsync(() => {
    const router = TestBed.inject(Router);
    router.initialNavigation();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('h3')?.textContent).toContain('Heroes of the day');
    });
  }));

  it('should show Dashboard page on clicking Dashboard link', waitForAsync(() => {
    const dashboardLink = compiled.querySelector('a.dashboard') as HTMLAnchorElement;
    expect(dashboardLink).toBeTruthy();
    dashboardLink.click();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('h3')?.textContent).toContain('Heroes of the day');
    });
  }));

  it('should show Heroes page on clicking Heroes link', waitForAsync(() => {
    const heroesLink = compiled.querySelector('a.heroes') as HTMLAnchorElement;
    heroesLink.click();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('h2')?.textContent).toContain('Heroes');
    });
  }));

});
