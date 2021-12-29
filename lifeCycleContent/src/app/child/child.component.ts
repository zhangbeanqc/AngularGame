import {AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy {

  constructor() { }

  // Child initiated after parent
  ngOnInit(): void {
    console.log("Child initiated");
  }

  // Hooks related to parent content will be invoked first, it is different to view
  ngAfterContentChecked(): void {
    console.log("Child embedded content change checked");
  }

  // Hooks related to parent content will be invoked first, it is different to view
  ngAfterContentInit(): void {
    console.log("Child embedded content initiated");
  }

  // Hooks related to child view will be invoked first, it is different to content
  ngAfterViewInit(): void {
    console.log("Child view initiated");
  }

  ngOnDestroy() {
    console.log("Destroy Child");
  }
}
