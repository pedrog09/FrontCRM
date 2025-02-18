import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotService } from '../services/chatbot/chatbot.service';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavigationComponent],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  userInput: string = '';
  messages: { text: string, isUser: boolean }[] = [];
  isLoading: boolean = false;

  constructor(private chatbotService: ChatbotService) {}

  async sendMessage() {
    if (!this.userInput.trim()) return;
    
    this.isLoading = true;
    try {
      // Add user message to chat history
      this.messages.push({ text: this.userInput, isUser: true });
      
      // Get bot response
      const apiResponse = await this.chatbotService.sendMessage(this.userInput);
      const botResponse = apiResponse.choices[0].message.content;
      
      // Add bot response to chat history
      this.messages.push({ text: botResponse, isUser: false });
      
      // Clear input
      this.userInput = '';
    } catch (error) {
      this.messages.push({ 
        text: 'Ocorreu um erro ao processar sua solicitação.', 
        isUser: false 
      });
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
