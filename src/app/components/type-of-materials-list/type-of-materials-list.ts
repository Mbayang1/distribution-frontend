import { Component, OnInit } from '@angular/core';
import { TypeOfMaterialsService } from '../../services/type-of-materials.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type-of-materials-list',
  standalone: true, // <-- Add this for standalone component
  imports: [CommonModule], // <-- Add CommonModule for *ngFor/*ngIf
  templateUrl: './type-of-materials-list.html',
  styleUrls: ['./type-of-materials-list.css']
})
export class TypeOfMaterialsList implements OnInit {
  typeOfMaterials: any[] = [];

  constructor(private typeOfMaterialsService: TypeOfMaterialsService) {}

  ngOnInit() {
    this.typeOfMaterialsService.getTypeOfMaterials().subscribe((data: any[]) => {
      this.typeOfMaterials = data;
    });
  }
}