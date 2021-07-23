import { Component, EventEmitter, forwardRef,
         Input, OnInit, Output,                } from '@angular/core';
import { AbstractControl, ControlValueAccessor,
         FormBuilder, FormGroup, NG_VALIDATORS,
         NG_VALUE_ACCESSOR, ValidationErrors,
         Validator, Validators,                } from '@angular/forms';

import { Subscription,                         } from 'rxjs';
import { debounceTime                          } from 'rxjs/operators';

interface ICityValidationMessageMap
{
  required: string;
}

interface IValidationMessageMap
{
  city: ICityValidationMessageMap;
}

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: [
    './address-info.component.scss',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInfoComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressInfoComponent),
      multi: true,
    },
  ],
})
export class AddressInfoComponent implements OnInit, ControlValueAccessor, Validator {
  @Input('index')
  public i = 0;

  @Output()
  public removeAddress: EventEmitter<number> = new EventEmitter<number>();

  public addreInfoFrom: FormGroup;
  public validationMessage: string;
  public countries: string[] = [
    'Armenia',
    'Belarus',
    'Hungary',
    'Kazakhstan',
    'Poland',
    'Russia',
    'Ukraine',
  ];

  private validationMessageMap : IValidationMessageMap = {
    city: {
      required: 'Please enter city.',
    },
  };
  private sub: Subscription;

  public constructor(
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.addreInfoFrom = this.buildAddress();
    this.watchValueChanges();
  }

  public onRemoveAddress(index: number): void {
    this.removeAddress.emit();
  }

  public onTouched: () => void = () => {};

  public writeValue(val: any): void {
    if (val) {
      this.addreInfoFrom.setValue(val, { emitEvent: false });
    }
  }

  public registerOnChange(fn: any): void {
    console.log('on change');

    this.addreInfoFrom.valueChanges.subscribe(fn);
  }

  public registerOnTouched(fn: any): void {
    console.log('on blur');

    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.addreInfoFrom.disable() : this.addreInfoFrom.enable();
  }

  public validate(c: AbstractControl): ValidationErrors | null {
    console.log('Address Info validation', c);

    return this.addreInfoFrom.valid ? null : {
      invalidForm: {
        valid: false,
        message: 'addressInfoForm fields are invalid'
      },
    };
  }

  private buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      country: '',
      city: [
        '',
        Validators.required,
      ],
      zip: '',
      street1: '',
      street2: '',
    });
  }

  private watchValueChanges(): void {
    const cityControl : AbstractControl | null = this.addreInfoFrom.get('city');

    if (cityControl) {
      cityControl.valueChanges.pipe(debounceTime(1000))
                              .subscribe(value => this.setValidationMessage(cityControl, 'city'));
    }
  }

  private setValidationMessage(
    control: AbstractControl,
    controlName: keyof IValidationMessageMap
  ): void {
    this.validationMessage = '';

    if ((control.touched || control.dirty) && control.errors) {
      this.validationMessage = Object.keys(control.errors)
                                     .map(key => this.validationMessageMap[controlName][key as keyof ICityValidationMessageMap])
                                     .join(' ');
    }
  }
}
