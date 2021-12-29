import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {consistencyValidator, mobileAsyncValidator, mobileValidator} from '../validator/validators';

// status
// touched/ untouched
// pristine/dirty
// pending

@Component({
  selector: 'app-reactive-register-form',
  templateUrl: './reactive-register-form.component.html',
  styleUrls: ['./reactive-register-form.component.css']
})
export class ReactiveRegisterFormComponent implements OnInit {

  formModel!: FormGroup;

  constructor(formBuilder: FormBuilder) {

    // Use form builder to simplify the life
    this.formModel = formBuilder.group({

      // userName: ['default', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      userName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],

      // Define 2 validator, one is sync another one is async, they MUST be put into 2 separated square brackets (box brackets)
      mobile: ['', [mobileValidator], [mobileAsyncValidator]],
      // mobile: ['', [Validators.pattern(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\\d{8})$/)]],

      passwordGroup: formBuilder.group({
        password: ['', [Validators.minLength(6)]],
        passwordConfirm: ['']
      }, { validator: consistencyValidator })
    });

    // this.formModle = new FormGroup({
    //   userName: new FormControl(),
    //   mobile: new FormControl(),
    //   passwordsGroup: new FormGroup({
    //     password: new FormControl(),
    //     passwordConfirm: new FormControl()
    //   })
    // })
  }

  onRegister() {
    // To avoid getting "Typescript: Type 'string | undefined' is not assignable to type 'string'" exception,

    // 1. We can use the non-null assertion operator here.
    // It tells TypeScript that even though something looks like it could be null, it can trust you that it's not.
    // If you are sure the this.formModle.get("userName")?.valid is not possible null, please use this way.
    let isValid: boolean = this.formModel.get("userName")?.valid!;

    // 2. This will make the error go away, but if by any chance this is not a string you will get a run-time error.
    // let isValid: boolean = this.formModle.get("userName")?.valid as boolean;

    // 3. As of TypeScript 3.7 you can use nullish coalescing operator ??. You can think of this feature as
    // a way to “fall back” to a default value when dealing with null or undefined
    // let isValid: boolean = this.formModle.get("userName")?.valid ?? true;

    // 4. Use || to do handle with undefined case
    // let isValid: boolean = this.formModle.get("userName")?.valid || true;

    // console.log("User name is valid: " + isValid);
    let errors: any = this.formModel.get("userName")?.errors;
    // console.log(errors);
    // console.log(this.formModle.value);

    let isMobileValid: boolean = this.formModel.get("mobile")?.valid!;
    // console.log("Mobile is valid: " + isMobileValid);

    if (this.formModel.valid) {
      console.log(this.formModel.value);
    }
  }

  ngOnInit(): void {
  }

}
