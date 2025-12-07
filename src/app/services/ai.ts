import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AiService {
  constructor(private http: HttpClient) {}

  ask(prompt: string): Promise<string>{
    const url =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/devops/src/chat'   // dev mode
    : '/devops/src/chat';                       // prod/docker mode

    return firstValueFrom(
    this.http.post<{ response: string }>(url, { prompt })
  ).then(r => r.response);



  }
}
