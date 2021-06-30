import { NgModule, } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { SignupReactiveFormComponent,
         SignupTemplateDrivenFormComponent, } from './components';

const routes: Routes = [
  {
    path: 'template-driven',
    component: SignupTemplateDrivenFormComponent,
  },
  {
    path: 'reactive',
    component: SignupReactiveFormComponent,
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "reactive",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
