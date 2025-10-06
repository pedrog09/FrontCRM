import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private apiKey = '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'; // Replace with your actual API key
  private siteUrl = 'http://localhost:4200'; // Replace with your actual site URL
  private siteName = 'Mini CRM'; // Replace with your actual site name

  constructor() {}

  async sendMessage(userInput: string): Promise<any> {
    const prompt = `Você é um assistente do mini CRM. Você só pode responder perguntas relacionadas ao sistema CRM, clientes, produtos e tarefas.
Se uma pergunta não estiver relacionada ao CRM, responda com "Desculpe, só posso responder perguntas sobre o CRM"

${userInput}`;

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': this.siteUrl,
        'X-Title': this.siteName,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
  }
}
