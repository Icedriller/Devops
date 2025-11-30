import { Component, ChangeDetectorRef, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiService } from '../services/ai';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.html'
})
export class ChatComponent {


  prompt = '';
  response = '';
  loading = false;

  constructor(
    private ai: AiService,
    private cd: ChangeDetectorRef
  ) {}

  async send() {
    if (!this.prompt.trim()) return;


    this.loading = true;
    this.response = '';
    this.cd.detectChanges();   // 🔥 UI updates immediately (“Thinking...”)

    try {
      const answer = await this.ai.ask(this.prompt);
      this.response = answer;
    } catch (err) {
      console.error(err);
      this.response = 'Error occurred while fetching AI response.';
    } finally {
      this.loading = false;
      this.cd.detectChanges(); // 🔥 forces UI update so response appears

    }
  }
}
