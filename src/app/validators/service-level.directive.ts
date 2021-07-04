import { Directive,         } from '@angular/core';
import { AbstractControl,
         NG_VALIDATORS,
         ValidationErrors,
         Validator,         } from '@angular/forms';

import { checkServiceLevel, } from './custom.validators';

@Directive({
  selector: '[appServiceLevelValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ServiceLevelDirective,
    multi: true,
  }],
})
export class ServiceLevelDirective implements Validator {
  public validate(c: AbstractControl): ValidationErrors | null {
    return checkServiceLevel(c, 1, 3);
  }
}
