import { Component, OnInit } from '@angular/core';
import { from, fromEvent, range} from "rxjs";
import { debounceTime, filter, map } from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent implements OnInit {

  // every input element has its FormControl
  searchInput: FormControl = new FormControl();

  constructor() {
    this.searchInput.valueChanges  // Every time when the value in input box change, this event is emitted to the Observer
      .pipe(
        // If within 500 ms nothing changes in input box, keep the value of it,
        // otherwise ignore it. (i.e, enter a long string into the input box, in the console
        // log we will see the input result only after we stop typing the keyboard.
        // If we set 500 to 1, then we can see all the input will be put into the console log.
        debounceTime(500)
      )
      .subscribe({
        // stockCode is the current value in input box
         next: (stockCode) => { this.getStockInfo(stockCode) },
         complete: () => {}
      })
  }

  birthday: Date = new Date();

  pi: number = 3.1415926;

  imgUrl: string = "http://placehold.it/600x300";

  size: number = 2;

  divNgClass: any = {
     a: false,
     b: false,
     c: false
  }

  canSave: boolean = true;

  divClass!: string;

  isDev: boolean = true;

  isBig: boolean = false;

  divStyle: any = {'font-style': this.canSave ? 'italic' : 'normal'};

  divNewStyle: any = {'font-style': 'italic'};

  name: string = "value";

  newName: string = "value";

  ngOnInit(): void {

    setInterval(() => {
      this.name = "Tom";
      this.newName = "Jane";
    }, 3000);

    setTimeout(() => {
      this.divClass = "a b c";
    }, 3000);

    setTimeout(() => {
      this.divNewStyle = {'font-style': 'normal'};
    }, 3000);

    setTimeout(() => {
      this.canSave = false;
    }, 3000);

    setTimeout(() => {
      this.isDev = false;
    }, 3000);

    setTimeout(() => {
      this.isBig = true;
    }, 6000);

    setTimeout(() => {
      this.divNgClass = {
        a: true,
        b: true,
        c: true
      };
    }, 6000);

    from([1, 2, 3, 4, 5, 6]).pipe(
      filter(e => e%2 == 0),
      map( e => e * 2)
    ).subscribe({
      next: e => {
        // This one will be executed at the last minute
        setTimeout(() => {
          console.log(e);
        }, 5000);
      },
      error: e => console.error(e),
      complete:() => {
         this.sleep(4000).then(() => {
           console.log("Done")});
       }
    });

    // Don't wait from()... to finish its task
    setTimeout(
      () => {
        console.log("Doing something slowly...")
      }, 2000);
  }

  sleep (time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  doOnClick(event: Event) {
    console.log(event);
    console.log((<HTMLButtonElement>event.target).innerHTML);
  }

  doOnInput(event: any) {
    // DOM attribute (change due to input value), it can be changed
    // Angular binding is based on DOM attribute
    console.log(event.target.value);
    // Html attribute (not change at all, it is the initiated value of Dom attribute), it can't be changed
    console.log(event.target.getAttribute('value'));
  }

  disableButton(event: any) {

    console.log("clicked");
    event.target.disabled = !event.target.disabled;
  }

  doInput(event: any) {
    this.name = event.target.value;
  }

  obserableTest() {

    // Observable emits event/data like stream
    range(1, 200)
      .pipe(
        filter(x => x % 2 === 1),
        map(x => x + x)
      )
      .subscribe(
        // This is the Observer
        {next: x => console.log(x)}
      );

    // Create Observable Observable.fromEvent
    const button = <HTMLButtonElement> document.querySelector("button");
    fromEvent(button, 'click');

    // Create Observable by Observable.from()
    const subscription = from([1, 2, 3, 4]).pipe(
      filter((e) => e%2 == 0),
      map(e => e*2))
      .subscribe(
        // This is the Observer
      {
          next: e => { console.log(e); console.log(e) },
          error: error => console.error(error),
          complete: () => console.log("End!")
      });
  }

  onKey(value: string) {
    console.log(value);
  }

  getStockInfo(code: string) {
    console.log(code);
  }
}
