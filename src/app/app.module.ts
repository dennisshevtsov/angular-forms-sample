import { NgModule, } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { BrowserModule, } from '@angular/platform-browser';

import { AppRoutingModule, } from './app-routing.module';
import { AppComponent, } from './app.component';
import { SignupTemplateDrivenFormComponent,
         SignupReactiveFormComponent, } from './components';

@NgModule({
  declarations: [
    AppComponent,
    SignupTemplateDrivenFormComponent,
    SignupReactiveFormComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
