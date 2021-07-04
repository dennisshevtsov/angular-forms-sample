import { NgModule, } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { BrowserModule, } from '@angular/platform-browser';

import { AppRoutingModule, } from './app-routing.module';
import { AppComponent, } from './app.component';
import { SignupTemplateDrivenFormComponent,
         SignupReactiveFormComponent, } from './components';
import { ValidatorsModule } from './validators/validators.module';

@NgModule({
  declarations: [
    AppComponent,
    SignupTemplateDrivenFormComponent,
    SignupReactiveFormComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ValidatorsModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
