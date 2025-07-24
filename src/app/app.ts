import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ImageItem {
  src: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- Add both modules here!
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  images: ImageItem[] = [
    {
      src: 'assets/first-pic.jpg',
      alt: 'Sample 1',
      title: 'Keep track of the given devices',
  
    },
    {
      src: 'assets/second-pic.jpg',
      alt: 'Sample 2',
      title: 'Add and remove devices',
    },
    {
      src: 'assets/third-pic.jpg',
      alt: 'Sample 3',
      title: 'Generate reports and statistics',

    }
    // Add more items as needed
  ];
}