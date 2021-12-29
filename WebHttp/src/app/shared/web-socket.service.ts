import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws!:WebSocket;

  constructor() { }

  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);

    // How to define an Observable, it must handle 3 things
    return new Observable(
      observer => {
        // 1. When emit next element
        this.ws.onmessage = (event) => observer.next(event.data);
        // 2. When throw out exception
        this.ws.onerror = (event) => observer.error(event);
        // 3. When emit stream completed signal
        this.ws.onclose = (event) => observer.complete();
      }
    );
  }

  sendMessage(message: string) {
    this.ws.send(message);
  }
}
