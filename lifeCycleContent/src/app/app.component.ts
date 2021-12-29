import {AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentInit, AfterContentChecked {

  title = 'lifeCycleContent';

  divContent = "<div>My Content</div>"

  message: string = "Hello";

  // Hooks related to parent content will be invoked first, it is different to view
  ngAfterContentChecked(): void {
    console.log("Parent embedded content change checked");
  }

  // Hooks related to parent content will be invoked first, it is different to view
  ngAfterContentInit(): void {
    console.log("Parent embedded content initiated");
    // Can change message here, it is different to view.
    this.message = this.message + " World";
  }

  // Hooks related to child view will be invoked first, it is different to content
  ngAfterViewInit(): void {
    console.log("Parent view initiated");
  }

  // Parent initiated first
  ngOnInit(): void {
    console.log("Parent initiated");
  }
}
