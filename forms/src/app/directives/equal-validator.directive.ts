import { Directive } from '@angular/core';
import {NG_VALIDATORS} from "@angular/forms";
import { equalValidator } from "../validator/validators";

@Directive({
  selector: '[udValidatorEqual]',
  // multi means that different validators use the same provide (here is NG_VALIDATORS)
  providers: [{provide: NG_VALIDATORS, useValue: equalValidator, multi: true}]
})
export class EqualValidatorDirective {

  constructor() { }

}
