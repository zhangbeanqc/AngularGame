import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-complex-template-form',
  templateUrl: './complex-template-form.component.html',
  styleUrls: ['./complex-template-form.component.css']
})
export class ComplexTemplateFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(values: any, valid: any) {

    console.log(values);
    console.log("Form is valid:" + valid);
    console.log(values['passwordGroup']['password']);
  }

  userNameValid: boolean = true;
  userNameUntouched: boolean = true;

  mobileValid: boolean = true;
  mobilePristine: boolean = true;

  onUserNameFocusOut(form: NgForm) {
    if (form) {
      this.userNameValid = form.form.get("userName")!.valid;
      this.userNameUntouched = form.form.get("userName")!.untouched;
    }
  }

  onMobileInput(form: NgForm) {
    if (form) {
      this.mobilePristine = form.form.get("mobile")!.pristine;
      this.mobileValid = form.form.get("mobile")!.valid;
    }
  }
}
