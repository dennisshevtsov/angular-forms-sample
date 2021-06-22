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
  public user = new UserModel();
  public userForm: FormGroup;

  public ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendProducts: new FormControl(true),
    });
  }

  public onSave(): void {
    console.log(this.userForm);
    console.log(`Saved: ${JSON.stringify(this.userForm.value)}`);
    console.log(`Saved: ${JSON.stringify(this.userForm.getRawValue())}`);
  }
}
