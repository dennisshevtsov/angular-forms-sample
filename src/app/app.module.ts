import { NgModule, } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { BrowserModule, } from '@angular/platform-browser';

import { AppRoutingModule, } from './app-routing.module';
import { AppComponent, } from './app.component';
import { SignupTemplateDrivenFormComponent,
         SignupReactiveFormComponent, } from './components';
import { ValidatorsModule } from './validators/validators.module';
import { AddressInfoComponent } from './components/address-info/address-info.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupTemplateDrivenFormComponent,
    SignupReactiveFormComponent,
    AddressInfoComponent,
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
