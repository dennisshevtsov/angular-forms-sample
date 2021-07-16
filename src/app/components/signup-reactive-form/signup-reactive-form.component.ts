import { Component, OnDestroy, OnInit, } from '@angular/core';
import { AbstractControl,
         AbstractControlOptions,
         FormBuilder,
         FormControl,
         FormGroup,
         Validators,                   } from '@angular/forms';

import { CustomValidators, } from '../../validators';
import { UserModel,        } from '../../models/user.model';

import { Subscription,     } from 'rxjs';
import { debounceTime,     } from 'rxjs/operators';

interface IEmailValidationMessageMap
{
  required?: string,
  pattern?: string,
  email?: string,
  asyncEmailInvalid?: string,
}

interface IValidationMessageMap
{
  email?: IEmailValidationMessageMap,
}

@Component({
  templateUrl: './signup-reactive-form.component.html',
  styleUrls: ['./signup-reactive-form.component.scss'],
})
export class SignupReactiveFormComponent implements OnInit, OnDestroy {
  public countries = [
    'Armenia', 'Belarus', 'Hungry', 'Kazakhstan',
    'Poland', 'Russia', 'Ukraine', ];
  public user = new UserModel();
  public placeholder = {
    email: 'Email (required)',
    confirmEmail: 'Confirm Email (required)',
    phone: 'Phone',
  };

  public userForm: FormGroup;

  public rMin = 1;
  public rMax = 3;

  public validationMessage: string;

  private sub: Subscription;
  private validationMessageMap: IValidationMessageMap = {
    email: {
      required: 'Please enter your email address.',
      pattern: 'Please enter a valid email address.',
      email: 'Please enter a valid email address',
      asyncEmailInvalid: 'This email already exists. Please enter other email address.',
    },
  };

  public constructor(
    private formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.buildForm();
    this.watchValueChanges();
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onSave(): void {
    console.log(this.userForm);
    console.log(`Saved: ${JSON.stringify(this.userForm.value)}`);
    console.log(`Saved: ${JSON.stringify(this.userForm.getRawValue())}`);
  }

  public onBlur(): void {
    const emailControl = this.userForm.get('emailGroup.email');

    if (emailControl != null) {
      this.setValidationMessage(emailControl, 'email');
    }
  }

  public isValid(controlName: string): boolean {
    const control = this.userForm.get(controlName);

    return control == null || !(control.touched || control.dirty) || control.valid;
  }

  public hasErrors(controlName: string): boolean {
    const control = this.userForm.get(controlName);

    return control != null && (control.touched || control.dirty) && control.errors != null;
  }

  public hasError(controlName: string, errorCode: string): boolean {
    const control = this.userForm.get(controlName);

    return control != null && control.hasError(errorCode);
  }

  public setNotification(notifyVia: string): void {
    const controls = new Map();

    controls.set('phoneControl', this.phone);
    controls.set('emailGroup', this.emailGroup);
    controls.set('emailControl', this.email);
    controls.set('confirmEmailControl', this.confirmEmail);

    if (notifyVia === "text") {
      controls.get('phoneControl').setValidators(Validators.required);
      controls.forEach(
        (control, index) => {
          if (index !== 'phoneControl') {
            control.clearValidators();
            control.clearAsyncValidators();
          }
        });

      this.placeholder = {
        phone: 'Phone (required)',
        email: 'Email',
        confirmEmail: 'Confirm Email',
      };
    }
    else {
      const emailControl = controls.get('emailControl');

      emailControl?.setValidators([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
        Validators.email,
      ]);
      emailControl?.setAsyncValidators(CustomValidators.asyncEmailPromiseValidator);
      
      controls.get('confirmEmailControl').setValidators(Validators.required);
      controls.get('emailControl').setValidators([CustomValidators.emailMatcher]);
      controls.get('phoneControl').clearValidators();

      this.placeholder = {
        phone: 'Phone',
        email: 'Email (required)',
        confirmEmail: 'Confirm Email (required)',
      };
    }

    controls.forEach(control => control.updateValueAndValidity());
  }

  public get phone(): AbstractControl | null {
    return this.userForm.get('phone');
  }

  public get email(): AbstractControl | null {
    return this.userForm.get('emailGroup.email');
  }

  public get confirmEmail(): AbstractControl | null {
    return this.userForm.get('emailGroup.confirmEmail');
  }

  public get emailGroup(): AbstractControl | null {
    return this.userForm.get('emailGroup');
  }

  private buildForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.control(
        '',
        {
          validators: [ Validators.required, Validators.minLength(3), ],
          updateOn: 'blur',
        }),
      lastName: [
        {
          value: 'Ivanov',
          disabled: false,
        },
        [
          Validators.required,
          Validators.maxLength(50),
        ]
      ],
      emailGroup: this.formBuilder.group({
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
            Validators.email,
          ],
        ],
        confirmEmail: [
          '',
          Validators.required,
        ],
      }, {
        validator: CustomValidators.emailMatcher
      } as AbstractControlOptions),
      phone: '',
      notification: 'email',
      serviceLevel: [''],
      sendProducts: true,
      addressType: 'home',
      country: '',
      city: '',
      zip: '',
      street1: '',
      street2: '',
    });
  }

  private watchValueChanges(): void {
    const notification: AbstractControl | null = this.userForm.get('notification');

    if (notification != null) {
      this.sub = notification.valueChanges.subscribe(value => this.setNotification(value));
    }

    const emailControl: AbstractControl | null = this.userForm.get('emailGroup.email');

    if (emailControl) {
      const sub: Subscription = emailControl.valueChanges.pipe(debounceTime(1000))
                                                         .subscribe(value => this.setValidationMessage(emailControl, 'email'));
      this.sub.add(sub);
    }
  }

  private setValidationMessage(
    c: AbstractControl,
    controlName: keyof IValidationMessageMap): void {
    this.validationMessage = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.validationMessage = Object.keys(c.errors)
                                     .map(key => this.validationMessageMap[controlName]![key as keyof IEmailValidationMessageMap])
                                     .join(' ');
    }
  }
}
