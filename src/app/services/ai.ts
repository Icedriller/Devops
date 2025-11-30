import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private genAI = new GoogleGenerativeAI('AIzaSyBjUUAF12ts5FGO-gqMTKDfZxpM85C7tsE');

  async ask(prompt: string): Promise<string> {
    try {
      // Use Gemini 2.5 Flash Lite
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-lite'
      });

      // Generate content
      const result = await model.generateContent(prompt);

      // Extract response text safely
      const response = result.response?.text() || '';
      console.log('Gemini response:', response);  // debug output

      return response.trim();
    } catch (err) {
      console.error('Gemini request failed:', err);
      return 'Error: could not get response from Gemini';
    }
  }
}
