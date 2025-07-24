import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServices {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // ✅ Generic GET method
  getData<T = any>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }

  // ✅ Generic POST method
  postData<T = any>(endpoint: string, payload: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, payload);
  }

  // ✅ Generic PUT method
  putData<T = any>(endpoint: string, payload: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, payload);
  }

  // ✅ Generic DELETE method
  deleteData<T = any>(endpoint: string, id: number): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }
 
}