import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { CommonModule } from '@angular/common'; // <-- Add this
import { FormsModule } from '@angular/forms'; // <-- Add this

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.html',
  styleUrls: ['./services-list.css']
})
export class ServicesList implements OnInit {
  services: any[] = [];

  constructor(private servicesService: ServicesService) {}

  ngOnInit() {
    this.servicesService.getServices().subscribe((data: any[]) => {
      this.services = data;
    });
  }
}