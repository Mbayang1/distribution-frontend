import { Component, OnInit } from '@angular/core';
import { MaterialsService } from '../../services/materials.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materials-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materials-list.html',
  styleUrls: ['./materials-list.css']
})
export class MaterialsList implements OnInit {
  materials: any[] = [];

  constructor(private materialsService: MaterialsService) {}

  ngOnInit() {
    this.materialsService.getMaterials().subscribe((data: any[]) => {
      this.materials = data;
    });
  }
}