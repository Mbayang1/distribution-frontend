import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-distribution-form',
  standalone: true,
  imports: [CommonModule], // <-- Add this line
  templateUrl: './distribution-form.html',
  styleUrls: ['./distribution-form.css']
})
export class DistributionForm {
  distributions: any[] = []; // <-- Add this line


  
  // ...your code...
}