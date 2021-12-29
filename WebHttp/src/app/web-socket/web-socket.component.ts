import { Component, OnInit } from '@angular/core';
import {WebSocketService} from "../shared/web-socket.service";

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit {

  constructor(private wsService: WebSocketService) { }

  ngOnInit(): void {

    this.wsService.createObservableSocket("ws://localhost:8085").subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
      complete: () => console.log("Stream is closed")}
    )}

  sendMessageToServer() {
    this.wsService.sendMessage("Hello from client");
  }

}
