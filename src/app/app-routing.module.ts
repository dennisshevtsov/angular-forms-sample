import { NgModule, } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { SignupFormComponent, } from './components';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupFormComponent,
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "signup",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
