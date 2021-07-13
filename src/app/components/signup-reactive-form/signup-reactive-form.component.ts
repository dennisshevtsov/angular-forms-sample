import { Component, OnInit, } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';

import { CustomValidators, } from '../../validators';
import { UserModel, } from '../../models/user.model';

@Component({
  templateUrl: './signup-reactive-form.component.html',
  styleUrls: ['./signup-reactive-form.component.scss'],
})
export class SignupReactiveFormComponent implements OnInit {
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

  public constructor(
    private formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.buildForm();
    //this.createForm();
  }

  public onSave(): void {
    console.log(this.userForm);
    console.log(`Saved: ${JSON.stringify(this.userForm.value)}`);
    console.log(`Saved: ${JSON.stringify(this.userForm.getRawValue())}`);
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

  public onSetNotification(notifyVia: string): void {
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

  private createForm(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(
        '',
        {
          validators: [ Validators.required, Validators.minLength(3), ],
          updateOn: 'blur',
        },
      ),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      notification: new FormControl('email'),
      serviceLevel: new FormControl(
        '',
        {
          validators: [ CustomValidators.serviceLevelRange(this.rMax, this.rMax), ],
          updateOn: 'blur',
        },
      ),
      sendProducts: new FormControl(true),
    });
  }

  private buildForm(): void {
    this.userForm = this.formBuilder.group({
      //firstName: [
      //  '',
      //  [
      //    Validators.required,
      //    Validators.minLength(3),
      //  ],
      //],
      // firstName: new FormControl(
      //   '',
      //   {
      //     validators: [ Validators.required, Validators.minLength(3), ],
      //     updateOn: 'blur',
      //   }),
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
      //email: [
      //  '',
      //  [
      //    Validators.required,
      //    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
      //    Validators.email,
      //  ],
        //[
        //  CustomValidators.asyncEmailPromiseValidator,
        //],
      //],
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
    });
  }
}
