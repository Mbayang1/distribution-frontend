import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeOfMaterialsService {
  private apiUrl = 'http://localhost:3000/type_of_materials';

  constructor(private http: HttpClient) {}

  getTypeOfMaterials(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Add more methods as needed
}