import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TemplateFormComponent } from './template-form/template-form.component';
import { SimpleTemplateFormComponent } from './simple-template-form/simple-template-form.component';
import { ComplexTemplateFormComponent } from './complex-template-form/complex-template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ReactiveRegisterFormComponent } from './reactive-register-form/reactive-register-form.component';
import { MobileValidatorDirective } from './directives/mobile-validator.directive';
import { EqualValidatorDirective } from './directives/equal-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    TemplateFormComponent,
    SimpleTemplateFormComponent,
    ComplexTemplateFormComponent,
    ReactiveFormComponent,
    ReactiveRegisterFormComponent,
    MobileValidatorDirective,
    EqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
