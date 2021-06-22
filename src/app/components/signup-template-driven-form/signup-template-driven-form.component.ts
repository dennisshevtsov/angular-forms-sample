import { Component, OnInit, } from '@angular/core';
import { NgForm, } from '@angular/forms';

import { UserModel, } from '../../models/user.model';

@Component({
  templateUrl: './signup-template-driven-form.component.html',
  styleUrls: [
    './signup-template-driven-form.component.scss',
  ],
})
export class SignupTemplateDrivenFormComponent implements OnInit {
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
