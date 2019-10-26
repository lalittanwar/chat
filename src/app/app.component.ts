import { Component,ViewChild,AfterViewInit} from '@angular/core';
//import {content} from 'ionic-angular';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatClient';
  //@ViewChild() contentArea: Content;

  name:string;
  room:string="Deluxe";
  messageArray:Array<{name:string,message:string}>=[];
  messageText:string;
  container:HTMLElement;

  constructor(private cs:ChatService){
    
    this.cs.newUserJoined()
    .subscribe(data=>(this.messageArray.push(data)))

    this.cs.userLeftRoom()
    .subscribe(data=>(this.messageArray.push(data)))

    this.cs.newMessageReceived()
    .subscribe(data=>(this.messageArray.push(data)))
  }

//   window.setInterval(function() {
//     var elem = document.getElementById('box');
//     elem.scrollTop = elem.scrollHeight;
// },1000);

  ngAfterViewInit() {         
    var element = document.getElementById('dis');
    element.scrollTop = element.scrollHeight;
  }  

  join(){
    this.cs.joinRoom({name:this.name,room:this.room})
    //this.name='';
  }

  leave(){
    this.cs.leaveRoom({name:this.name,room:this.room})
  }

  sendMessage(){
    this.cs.sendMessage({name:this.name,room:this.room,message:this.messageText})
    this.messageText=''
  }
}
