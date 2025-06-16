import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private apiUrl = 'http://localhost:3000/departments';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Add more methods as needed
}