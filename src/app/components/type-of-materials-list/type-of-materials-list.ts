// departments-list.ts
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ApiServices } from "../../services/api_services";

@Component({
  selector: 'app-type_of_materials-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './type_of_materials-list.html',
  styleUrls: ['./type_of_materials-list.css']
})
export class TypeOfMaterialsList implements OnInit {
  type_of_materials: any[] = [];
  currentType: any = { name: '', description: '' };
  showModal = false;
  isEditing = false;
  searchTerm: string = '';

  // 🔔 Notification
  notificationMessage: string = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(public api: ApiServices) {}

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes(): void {
    this.api.getData('type_of_materials').subscribe({
      next: (data: any[]) => (this.type_of_materials = data),
      error: err => {
        console.error('Erreur lors du chargement des types :', err);
        this.showNotification('Erreur de chargement.', 'error');
      }
    });
  }

  filteredTypes(): any[] {
    if (!this.searchTerm.trim()) return this.type_of_materials;
    return this.type_of_materials.filter(type =>
      type.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddModal(): void {
    this.currentType = { name: '', description: '' };
    this.isEditing = false;
    this.showModal = true;
  }

  openEditModal(type: any): void {
    this.currentType = { ...type };
    this.isEditing = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveType(): void {
    if (!this.currentType.name.trim()) {
      this.showNotification('Le nom du type est requis.', 'error');
      return;
    }

    if (this.isEditing && this.currentType.type_ID) {
      // Modifier
      this.api.putData('type_of_materials/updateType', {
        type_ID: this.currentType.type_ID,
        name: this.currentType.name,
        description: this.currentType.description
      }).subscribe({
        next: () => {
          this.getTypes();
          this.closeModal();
          this.showNotification('Type modifié avec succès !');
        },
        error: err => {
          console.error('Erreur lors de la modification :', err);
          this.showNotification('Échec de la modification.', 'error');
        }
      });
    } else {
      // Ajouter
      this.api.postData('Type_of_materials', {
        name: this.currentType.name,
        description: this.currentType.description
      }).subscribe({
        next: () => {
          this.getTypes();
          this.closeModal();
          this.showNotification('Type ajouté avec succès !');
        },
        error: err => {
          console.error('Erreur lors de l\'ajout :', err);
          this.showNotification('Échec de l\'ajout.', 'error');
        }
      });
    }
  }

  deleteType(id: number): void {
    if (confirm('Supprimer ce type ?')) {
      this.api.deleteData('type_of_materials', id).subscribe({
        next: () => {
          this.getTypes();
          this.showNotification('Type supprimé avec succès !');
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
