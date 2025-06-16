import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AgentsService {
  private apiUrl = 'http://localhost:3000/agents'; // Your backend endpoint

  constructor(private http: HttpClient) {}

  getAgents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAgent(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addAgent(agent: any): Observable<any> {
    return this.http.post(this.apiUrl, agent);
  }

  updateAgent(id: number, agent: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, agent);
  }

  deleteAgent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}