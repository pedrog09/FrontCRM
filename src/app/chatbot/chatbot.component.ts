import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],

  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  messages: { text: string, isUser: boolean }[] = [];
  userInput = '';

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, isUser: true });
      
      // Simulate bot response
      setTimeout(() => {
        this.messages.push({ text: 'Resposta do chatbot...', isUser: false });
      }, 500);
      
      this.userInput = '';
    }
  }
}
