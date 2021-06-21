import { Component, OnInit, } from '@angular/core';
import { NgForm, } from '@angular/forms';

import { UserModel, } from '../../models/user.model';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: [
    './signup-form.component.scss',
  ],
})
export class SignupFormComponent implements OnInit {
  public countries = [ 'Ukraine', 'Armenia', 'Belarus',
                       'Hungry', 'Kazakhstan', 'Poland', 'Russia', ];

  public user = new UserModel();

  public constructor() { }

  public ngOnInit(): void {
  }

  public onSave(signupForm: NgForm): void {
    console.log(signupForm.form);
    console.log(`Saved: ${JSON.stringify(signupForm.value)}`);
  }
}
