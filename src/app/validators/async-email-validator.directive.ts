import { Directive,           } from '@angular/core';
import { AbstractControl,
         NG_ASYNC_VALIDATORS,
         ValidationErrors,
         Validator,           } from '@angular/forms';

import { Observable,          } from 'rxjs';

@Directive({
  selector: '[appAsyncEmailValidator][formControlName],[appAsyncEmailValidator][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AsyncEmailValidatorDirective,
      multi: true,
    },
  ],
})
export class AsyncEmailValidatorDirective implements Validator {
  public validate(c: AbstractControl)
  : Promise<ValidationErrors | null> |
    Observable<ValidationErrors | null> {
    return this.validateEmailObservable(c.value);
  }

  private validateEmailObservable(email: string)
  : Observable<ValidationErrors | null> {
    return new Observable(observer => {
      if (email === 'existsemail@example.com') {
        observer.next({
          asyncEmailInvalid: true,
        });
      } else {
        observer.next(null);
      }
    });
  }
}
