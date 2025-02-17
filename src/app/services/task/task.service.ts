import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5169/api';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.loginService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Tarefa`, { headers: this.getHeaders() });
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Tarefa`, {
      name: task.name,
      description: task.description,
      status: task.status,
      usuarioId: task.usuarioId,
      ending: task.ending
    }, { headers: this.getHeaders() });
  }

  updateTask(task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Tarefa/${task.id}`, {
      id: task.id,
      name: task.name,
      description: task.description,
      status: task.status,
      usuarioId: task.usuarioId,
      ending: task.ending
    }, { headers: this.getHeaders() });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Tarefa/${id}`, { headers: this.getHeaders() });
  }
}
