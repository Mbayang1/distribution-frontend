import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../services/api_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  stats = {
    total_agents: 0,
    available_materials: 0,
    total_services: 0,
    total_distributions: 0
  };

  constructor(private api: ApiServices) {}

  ngOnInit(): void {
    // Use your existing getData() method with correct endpoint
    this.api.getData('dashboard/stats').subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Failed to load dashboard stats', err);
      }
    });
  }
}
