import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
  static serviceLevel(c: AbstractControl): ValidationErrors | null {
    console.log('Validator: serviceLevel is called');

    if (c.value !== undefined && (Number.isNaN(c.value) || c.value < 1 || c.value > 5)) {
      return {
        serviceLevel: true,
      };
    }

    return null;
  }
}
