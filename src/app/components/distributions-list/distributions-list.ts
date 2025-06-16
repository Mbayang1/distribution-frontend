import { Component, OnInit } from '@angular/core';
import { DistributionsService } from '../../services/distributions.service';
import { CommonModule } from '@angular/common'; // <-- Add this
import { FormsModule } from '@angular/forms'; // <-- Add this

@Component({
  selector: 'app-distributions-list',
  templateUrl: './distributions-list.html',
  styleUrls: ['./distributions-list.css']
})
export class DistributionsList implements OnInit {
  distributions: any[] = [];

  constructor(private distributionsService: DistributionsService) {}

  ngOnInit() {
    this.distributionsService.getDistributions().subscribe((data: any[]) => {
      this.distributions = data;
    });
  }
}