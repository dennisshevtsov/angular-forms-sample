import { Directive, Input,  } from '@angular/core';
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
  @Input()
  public rMin = 1;

  @Input()
  public rMax = 3;

  public validate(c: AbstractControl): ValidationErrors | null {
    return checkServiceLevel(c, this.rMin, this.rMax);
  }
}
