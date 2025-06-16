import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'http://localhost:3000/services';

  constructor(private http: HttpClient) {}

  getServices(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getService(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addService(service: any): Observable<any> {
    return this.http.post(this.apiUrl, service);
  }

  updateService(id: number, service: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, service);
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}