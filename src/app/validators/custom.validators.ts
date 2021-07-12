import { AbstractControl,
         ValidationErrors,
         ValidatorFn,      } from "@angular/forms";

import { Observable,       } from "rxjs";

export class CustomValidators {
  public static serviceLevel(c: AbstractControl): ValidationErrors | null {
    return checkServiceLevel(c);
  }

  public static serviceLevelRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      return checkServiceLevel(c, min, max);;
    };
  }

  public static asyncEmailPromiseValidator(c: AbstractControl):
    Promise<ValidationErrors | null> |
    Observable<ValidationErrors | null> {
    const email: any = c.value;

    return new Promise(resolve => {
      setTimeout(() => {
        if (email === 'existsemail@example.com') {
          resolve({
            asyncEmailInvalid: true,
          });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }

  public static emailMatcher(c: AbstractControl):
    ValidationErrors | null {
    const emailControl = c.get('email');
    const confirmEmailControl = c.get('confirmEmail');

    if (emailControl?.pristine || confirmEmailControl?.pristine) {
      return null;
    }

    if (emailControl?.value === confirmEmailControl?.value) {
      return null;
    }

    return {
      emailMatch: true,
    };
  }
}

export function checkServiceLevel(
  c: AbstractControl,
  min: number = 1,
  max: number = 5,
): ValidationErrors | null {
  if (c.value !== undefined &&
      (Number.isNaN(c.value) || c.value < min || c.value > max)) {
    return {
      serviceLevel: true,
    };
  }

  return null;
}
