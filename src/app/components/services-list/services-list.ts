import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ApiServices } from "../../services/api_services";

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services-list.html',
  styleUrls: ['./services-list.css']
})

export class ServicesList implements OnInit {
  services: any[] = [];
  departments: any[] = [];
  currentService: any = {  name: '', department: 0 };
  showModal = false;
  isEditing = false;
  searchTerm = '';

  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(public api: ApiServices) {}

  ngOnInit(): void {
    this.getDepartments();
    this.getServices();
  }

   getDepartments(): void {
    this.api.getData('departments').subscribe({
      next: (data: any[]) => (this.departments = data),
      error: err => {
        console.error('Erreur lors du chargement des départements :', err);
        this.showNotification('Erreur de chargement.', 'error');
      }
    });
  }

  getServices(): void {
    this.api.getData('services').subscribe({
      next: (data: any[]) => (this.services = data),
      error: err => {
        console.error('Erreur lors du chargement des services :', err);
        this.showNotification('Erreur de chargement.', 'error');
      }
    });
  }
  
  filteredServices(): any[] {
    if (!this.searchTerm.trim()) return this.services;
    return this.services.filter(service =>
      service.service_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

   openAddModal(): void {
    this.currentService = { name: '', department: '' };
    this.isEditing = false;
    this.showModal = true;
  }

  openEditModal(services: any): void {
this.currentService = { 
   service_ID: services.service_ID,
   name: services.name, 
   department: services.department_ID };

    this.isEditing = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
   saveService(): void {
    if (!this.currentService.name.trim()) {
      this.showNotification('Le nom du service est requis.', 'error');
      return;
    }

    if (this.isEditing && this.currentService.service_ID) {
      // Modifier
      this.api.putData('services/updateService', {
        department: this.currentService.department,
        name: this.currentService.name,
        service_ID: this.currentService.service_ID
      }).subscribe({
        next: () => {
          this.getServices();
          this.closeModal();
          this.showNotification('Service modifié avec succès !');
        },
        error: err => {
          console.error('Erreur lors de la modification :', err);
          this.showNotification('Échec de la modification.', 'error');
        }
      });
    } else {
      // Ajouter
      this.api.postData('services', {
        name: this.currentService.name,
        department: this.currentService.department
      }).subscribe({
        next: () => {
          this.getServices();
          this.closeModal();
          this.showNotification('Service ajouté avec succès !');
        },
        error: err => {
          console.error('Erreur lors de l\'ajout :', err);
          this.showNotification('Échec de l\'ajout.', 'error');
        }
      });
    }
  }
 deleteService( services: any): void {
  console.log(" services a supprimer ", services.service_ID)
    if (confirm('Supprimer ce service ?')) {
      this.api.deleteData('services', services.service_ID).subscribe({
        next: () => {
          this.getServices();
          this.showNotification('service supprimé avec succès !');
        },
        error: err => {
          console.error('Erreur lors de la suppression :', err);
          this.showNotification('Échec de la suppression.', 'error');
        }
      });
    }
  }
  showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    this.notificationMessage = message;
    this.notificationType = type;

    setTimeout(() => {
      this.notificationMessage = '';
    }, 3000);
  }
}

