// departments-list.ts
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ApiServices } from "../../services/api_services";

@Component({
  selector: 'app-departments-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departments-list.html',
  styleUrls: ['./departments-list.css']
})
export class DepartmentsList implements OnInit {
  departments: any[] = [];
  currentDepartment: any = { name: '', description: '' };
  showModal = false;
  isEditing = false;
  searchTerm: string = '';

  // 🔔 Notification
  notificationMessage: string = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(public api: ApiServices) {}

  ngOnInit(): void {
    this.getDepartments();
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

  filteredDepartments(): any[] {
    if (!this.searchTerm.trim()) return this.departments;
    return this.departments.filter(dept =>
      dept.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddModal(): void {
    this.currentDepartment = { name: '', description: '' };
    this.isEditing = false;
    this.showModal = true;
  }

  openEditModal(dept: any): void {
    this.currentDepartment = { ...dept };
    this.isEditing = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveDepartment(): void {
    if (!this.currentDepartment.name.trim()) {
      this.showNotification('Le nom du département est requis.', 'error');
      return;
    }

    if (this.isEditing && this.currentDepartment.department_ID) {
      // Modifier
      this.api.putData('departments/updateDepartement', {
        department_ID: this.currentDepartment.department_ID,
        name: this.currentDepartment.name,
        description: this.currentDepartment.description
      }).subscribe({
        next: () => {
          this.getDepartments();
          this.closeModal();
          this.showNotification('Département modifié avec succès !');
        },
        error: err => {
          console.error('Erreur lors de la modification :', err);
          this.showNotification('Échec de la modification.', 'error');
        }
      });
    } else {
      // Ajouter
      this.api.postData('departments', {
        name: this.currentDepartment.name,
        description: this.currentDepartment.description
      }).subscribe({
        next: () => {
          this.getDepartments();
          this.closeModal();
          this.showNotification('Département ajouté avec succès !');
        },
        error: err => {
          console.error('Erreur lors de l\'ajout :', err);
          this.showNotification('Échec de l\'ajout.', 'error');
        }
      });
    }
  }

  deleteDepartment(id: number): void {
    if (confirm('Supprimer ce département ?')) {
      this.api.deleteData('departments', id).subscribe({
        next: () => {
          this.getDepartments();
          this.showNotification('Département supprimé avec succès !');
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
