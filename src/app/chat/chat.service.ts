import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'https://localhost:7162/chat'
  connection!: signalR.HubConnection;
  public async start(token: string) {
    try {
      this.connection  = new signalR.HubConnectionBuilder()
      .withUrl(this.url, {accessTokenFactory: () => token})
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
      this.connection.on("ReceiveMessage", (user: string, message: string, messageDate: Date) => {
        console.log('user:' + user);
        console.log('message:' + message);
        console.log('message time:' + messageDate);
      });
      await this.connection.start().then(x => console.log(x));
    }
    catch(error) {
      console.log(error);
      setTimeout(() => {
        this.start(token);
      }, 5000);
    }
  }

  async sendMessage(conversationId: number, message: string, userId: string) {
    return this.connection.invoke("SendMessage", conversationId, message, userId)
  }
}
