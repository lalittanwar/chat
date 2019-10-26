import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  private socket = io('https://chat-vicky.herokuapp.com/')

  joinRoom(data){
    this.socket.emit('join',data)
  }

  newUserJoined(){
    let observable=new Observable<{name:string,message:string}>(observer=>{
      this.socket.on('new user joined',(data)=>{
        observer.next(data);
      });
      return()=>{this.socket.disconnect();}
    });
    return observable;
  }

  leaveRoom(data){
    this.socket.emit('leave',data);
    document.location.reload()
  }

  userLeftRoom(){
    let observable=new Observable<{name:string,message:string}>(observer=>{
      this.socket.on('left room',(data)=>{
        observer.next(data);
      });
      return()=>{this.socket.disconnect();}
    });
    return observable;
  }

  sendMessage(data){
    this.socket.emit('message',data);
  }

  newMessageReceived(){
    let observable=new Observable<{name:string,message:string}>(observer=>{
      this.socket.on('new message',(data)=>{
        observer.next(data);
      });
      return()=>{this.socket.disconnect();}
    });
    return observable;
  }
}
