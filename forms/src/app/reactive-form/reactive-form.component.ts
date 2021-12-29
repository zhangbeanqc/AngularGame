import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  userName: FormControl = new FormControl("User Name");

  // This FormGroup is mandatory, it must be added to the root form
  formModel: FormGroup = new FormGroup({
     mobile: new FormControl(),
     dateRange: new FormGroup({
       from: new FormControl(),
       to: new FormControl()
     }),
     // Visit items in a FormArray by index (0, 1, 2 ...)
     emails: new FormArray([
       new FormControl("a@a.com"),
       new FormControl("b@b.com"),
       new FormControl("c@c.com")
     ])
  });


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formModel.value);
  }

  getControls() {
    return (this.formModel.get('emails') as FormArray).controls;
  }

  addEmail() {
    (this.formModel.get('emails') as FormArray).push(new FormControl());
  }
}

