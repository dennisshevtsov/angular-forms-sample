import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, } from '@angular/forms';

import { UserModel, } from '../../models/user.model';

@Component({
  templateUrl: './signup-reactive-form.component.html',
  styleUrls: ['./signup-reactive-form.component.scss']
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

  public ngOnInit(): void {
    this.initializeForm();
    this.setFormsValues();
    // this.patchFormValues();
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

  private initializeForm(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendProducts: new FormControl(true),
    });
  }

  private setFormsValues(): void {
    this.userForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      sendProducts: this.user.sendProducts,
    });
  }

  private patchFormValues(): void {
    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
    });
  }
}
