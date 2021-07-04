import { AbstractControl,
         ValidationErrors,
         ValidatorFn, } from "@angular/forms";

export class CustomValidators {
  public static serviceLevel(c: AbstractControl): ValidationErrors | null {
    return checkServiceLevel(c);
  }

  public static serviceLevelRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      return checkServiceLevel(c, min, max);;
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
