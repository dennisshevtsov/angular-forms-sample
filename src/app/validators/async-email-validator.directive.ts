import { Directive,           } from '@angular/core';
import { NG_ASYNC_VALIDATORS, } from '@angular/forms';

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
export class AsyncEmailValidatorDirective {

}
