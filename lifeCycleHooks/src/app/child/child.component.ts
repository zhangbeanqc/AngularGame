import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnChanges, DoCheck, AfterViewChecked, AfterContentChecked {

  @Input()
  greeting!: string;

  @Input()
  user!: {name: string};

  oldUserName!: string;

  // message doesn't have @Input() decorator, so when we change its value in input box, ngOnChanges isn't invoked.
  message!: string;

  changeDetected: boolean = false;

  ngOnChangeCount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  // Because we only change user.name, so ngOnChanges is not invoked when we change user.name in the input box
  ngOnChanges(changes: SimpleChanges): void {

    console.log(JSON.stringify(changes, null, 2));
  }

  // ATTENTION!!!!!!
  // ngDoCheck is invoked even if we only change focus on components.
  // Keep the implementation pretty lightweight to avoid affecting the performance.
  ngDoCheck(): void {

    if (this.oldUserName !== this.user.name) {
      this.changeDetected = true;
      console.log("DoCheck: user.name is changed from " + this.oldUserName + " to " + this.user.name);
      this.oldUserName = this.user.name;
    }

    if (this.changeDetected) {
      this.ngOnChangeCount =  0;
    } else {
      this.ngOnChangeCount++;
      console.log("DoCheck: user.name is invoked " + this.ngOnChangeCount + " times when user.name is not changed");
    }
    this.changeDetected = false;
  }

  // ATTENTION!!!!!!
  // ngAfterContentChecked is also invoked even if we only change focus on components or when ngDoCheck() is invoked,
  // so we must pay very attention to keep the implementation pretty lightweight
  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked");
  }

  // ATTENTION!!!!!!
  // ngAfterViewChecked is akso invoked even if we only change focus on components or when ngDoCheck() is invoked,
  // so we must pay very attention to keep the implementation pretty lightweight
  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked");
  }


}
