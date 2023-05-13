import { HttpErrorResponse } from '@angular/common/http';
import { signal, computed, Injectable } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

@Injectable()
export class AppAlertService {
  readonly message = signal<string>('');
  readonly show = signal<boolean>(false);
  readonly display = computed(() => (this.message() && this.show()));

  open(msg?: string) {
    if (msg) { this.message.set(msg); }
    this.show.set(true);
  }

  close() { this.show.set(false); }

  handleError<T>(obs: Observable<T>): Observable<T> {
    return obs.pipe(catchError((error: HttpErrorResponse | any) => {
      this.open(error.error || error.body.error || 'Server error');
      return EMPTY;
    }));
  }
}
