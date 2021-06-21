import { NgModule, } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { BrowserModule, } from '@angular/platform-browser';

import { AppRoutingModule, } from './app-routing.module';
import { AppComponent, } from './app.component';
import { SignupFormComponent, } from './components';

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
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
