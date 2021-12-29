import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  testObject = {isOK: true};

  log(message: string) {
    console.log(this.testObject.isOK);
    console.log(message);
  }
}
