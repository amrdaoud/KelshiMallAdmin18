import { Component, inject } from '@angular/core';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-chat-test',
  standalone: true,
  imports: [],
  templateUrl: './chat-test.component.html',
  styleUrl: './chat-test.component.scss'
})
export class ChatTestComponent {
  private chatService = inject(ChatService);
 
  startConnection() {
    const token = (JSON.parse(localStorage.getItem('auth')!)).token;
    this.chatService.start(token);
  }
  sendMessage(conversationId: number, message: string, userId: string) {
    this.chatService.sendMessage(conversationId,message,userId)
  }
}
