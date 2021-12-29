import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck, Input,
  OnChanges, OnDestroy,
  OnInit, SimpleChanges
} from '@angular/core';

let logIndex: number = 1;

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.css']
})
export class LifeComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy {

  @Input()
  name!: string;

  logIt(msg: string) {
    console.log(`#${logIndex++} ${msg}`)
  }

  // #6
  ngAfterContentChecked(): void {
    this.logIt("value of name in ngAfterContentChecked is " + this.name);
  }

  // #5
  ngAfterContentInit(): void {
    this.logIt("value of name in ngAfterContentInit is " + this.name);
  }

  // #8
  ngAfterViewChecked(): void {
    this.logIt("value of name in ngAfterViewChecked is " + this.name);
  }

  // #7
  ngAfterViewInit(): void {
    this.logIt("value of name in ngAfterViewInit is " + this.name);
  }

  // #4
  ngDoCheck(): void {
    this.logIt("value of name in ngDoCheck is " + this.name);
  }

  // #2. It is invoked before ngOnInit, it is invoked when parent passes some params to it
  ngOnChanges(changes: SimpleChanges): void {
    this.name = changes['name'].currentValue;
    this.logIt("value of name in ngOnChanges is " + this.name);
  }

  // #1
  constructor() {
    this.logIt("value of name in constructor is " + this.name);
  }

  ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

  // #3. If the value initiation depends external parameter, it must be put in ngOnInit instead of in constructor.
  ngOnInit(): void {
    this.logIt("value of name in ngOnInit is " + this.name);
  }

}
