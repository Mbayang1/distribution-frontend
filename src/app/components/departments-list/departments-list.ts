import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-departments-list',
  standalone: true, // <-- Add this for standalone component
  imports: [CommonModule], // <-- Add CommonModule for *ngFor/*ngIf
  templateUrl: './departments-list.html',
  styleUrls: ['./departments-list.css']
})
export class DepartmentsList implements OnInit {
  departments: any[] = [];

  constructor(private departmentsService: DepartmentsService) {}

  ngOnInit() {
    this.departmentsService.getDepartments().subscribe((data: any[]) => {
      this.departments = data;
    });
  }
}