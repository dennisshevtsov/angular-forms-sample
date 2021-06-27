import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';

import { UserModel, } from '../../models/user.model';

@Component({
  templateUrl: './signup-reactive-form.component.html',
  styleUrls: ['./signup-reactive-form.component.scss'],
})
export class SignupReactiveFormComponent implements OnInit {
  public countries = [
    'Armenia', 'Belarus', 'Hungry', 'Kazakhstan',
    'Poland', 'Russia', 'Ukraine', ];
  public user = new UserModel(
    'Ivan',
    'Ivanov',
    'ivanivanov@test.test',
    false
  );
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

  private buildForm() {
    this.userForm = this.formBuilder.group({
      firtName: '',
      lastName: {
        value: 'Ivanov',
        disabled: true,
      },
      email: [''],
      sendProducts: true,
    });
  }
}
