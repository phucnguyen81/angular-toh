import { Component, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({ template: '' })
export abstract class BaseComponent implements OnDestroy {

  private readonly subscription: Subscription = new Subscription();

  protected subUntilDestroy<T>(obs: Observable<T>, observerOrNext?: Partial<Observer<T>> | ((value: T) => void)): Observable<T> {
    this.subscription.add(obs.subscribe(observerOrNext));
    return obs;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
