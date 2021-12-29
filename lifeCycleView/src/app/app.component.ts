import {AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ChildComponent} from "./child/child.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked, AfterViewInit, DoCheck {

  // Since Angular 8, we must set  {static: true} in @ViewChild
  @ViewChild("child1", {static: true})
  child1!: ChildComponent;

  message?: string;

  constructor() {
  }

  ngOnInit(): void {
    // Invoke greeting of child
    setInterval(() => {
      // Trigger change detection, all the XXXChecked methods in children and parent are invoked
      this.child1.greeting("Tom");
    }, 5000);
  }

  ngAfterViewChecked(): void {
    console.log("Parent view change detected");
  }

  ngAfterViewInit(): void {
    console.log("Parent view initiated");

    // Change value in message will affect the view, since ngAfterViewInit is invoked after view has been assembled,
    // Angular doesn't allow view to be modified, so we will an exception if we do that.
    // this.message = "Hello";

    // To resolve this issue, we can use the following code so that this.message change starts in next JS iteration.
    // Changing value this.message will be detected by Angular change detection strategy, XXXCheck method will be invoked
    // when this.message is changed, but XXXInit won't.
    setTimeout(() => {
      this.message = "Hello";
    }, 0);
  }

  ngDoCheck(): void {
    console.log("Parent DoCheck detected");
  }
}
