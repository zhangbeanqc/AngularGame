import {AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, AfterViewInit, AfterViewChecked, DoCheck {

  constructor() { }

  ngDoCheck(): void {
    console.log("Child DoCheck detected");
  }

  ngOnInit(): void {
  }

  greeting(name: string) {
    console.log("Hello", name);
  }

  ngAfterViewChecked(): void {
    console.log("Child view change detected");
  }

  ngAfterViewInit(): void {
    console.log("Child view initiated");
  }

}

