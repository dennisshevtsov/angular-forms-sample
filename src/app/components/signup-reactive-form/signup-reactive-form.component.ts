import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';

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
    phone: 'Phone',
  };
  public userForm: FormGroup;

  public constructor(
    private formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.buildForm();
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
    const phoneControl = this.userForm.get("phone");
    const emailControl = this.userForm.get("email");

    if (notifyVia === "text") {
      phoneControl?.setValidators(Validators.required);
      emailControl?.clearValidators();

      this.placeholder.phone = 'Phone (required)';
      this.placeholder.email = 'Email';
    }
    else {
      emailControl?.clearValidators();

      this.placeholder.phone = 'Phone';
      this.placeholder.email = 'Email (required)';
    }

    phoneControl?.updateValueAndValidity();
    emailControl?.updateValueAndValidity();
  }

  private buildForm() {
    this.userForm = this.formBuilder.group({
      firtName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ],
      ],
      lastName: [
        {
          value: 'Ivanov',
          disabled: true,
        },
        [
          Validators.required,
          Validators.maxLength(50),
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
          Validators.email,
        ]
      ],
      phone: '',
      notification: 'email',
      sendProducts: true,
    });
  }
}
