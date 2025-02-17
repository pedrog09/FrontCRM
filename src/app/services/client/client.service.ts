import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:5169/api';

  constructor(private http: HttpClient) {}

  getClients(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Cliente`);
  }

  createClient(client: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Cliente`, {
      usuarioId: client.usuarioId,
      name: client.name,
      email: client.email,
      role: client.role,
      tipo: client.tipo,
      cpf: client.tipo === 'Pessoa' ? client.cpf : null,
      cnpj: client.tipo === 'Empresa' ? client.cnpj : null
    });
  }

  updateClient(client: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Cliente/${client.id}`, {
      id: client.id,
      usuarioId: client.usuarioId,
      name: client.name,
      email: client.email,
      role: client.role,
      tipo: client.tipo,
      cpf: client.tipo === 'Pessoa' ? client.cpf : null,
      cnpj: client.tipo === 'Empresa' ? client.cnpj : null
    });
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Cliente/${id}`);
  }
}
