import {FormControl, FormGroup} from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

export function mobileValidator(control: FormControl): any {
  // 130/150/180 + 8 digits
  let myReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  let valid = myReg.test(control.value);
  console.log("Validating result is: " + valid);
  return valid ? null : { mobile: true };
}

export function mobileAsyncValidator(control: FormControl): any {
  // 130/150/180 + 8 digits
  let myReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  let valid = myReg.test(control.value);
  console.log("Validating result is: " + valid);

  return of(valid ? null : { mobile: true }).pipe(
    delay(5000)
  );
}

export function  consistencyValidator(group: FormGroup): any {
  let valid = group.get('password')!.value == group.get('passwordConfirm')!.value;
  console.log("Password is valid: " + valid);
  return valid ? null : {consistent: {inconsistenceDesc: 'password mismatched'}};
  // return valid ? null : { consistent: true};
}

export function equalValidator(group: FormGroup): any {
  let valid = group.get('password')?.value == group.get('passwordConfirm')?.value;
  console.log("Password is valid: " + valid);
  return valid ? null : {equal: {notEqualDesc: 'password mismatched'}};
}

