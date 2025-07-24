import { CommonModule } from "@angular/common";
import { Component, model, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ApiServices } from "../../services/api_services";

@Component({
  selector: 'app-materials-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materials-list.html',
  styleUrls: ['./materials-list.css']
})

export class MaterialsListComponent implements OnInit {
  materials: any[] = [];
  type_of_materials: any[] = [];
  currentMaterial: any = {  name: '', description: '', quantity: 0, type: '' };
  showModal = false;
  isEditing = false;
  searchTerm = '';

  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(public api: ApiServices) {}

  ngOnInit(): void {
    this.getTypes();
    this.getMaterials();
  }

   getTypes(): void {
    this.api.getData('type_of_materials').subscribe({
      next: (data: any[]) => (this.type_of_materials = data),
      error: err => {
        console.error('Erreur lors du chargement des materiels :', err);
        this.showNotification('Erreur de chargement.', 'error');
      }
    });
  }

  getMaterials(): void {
    this.api.getData('materials').subscribe({
      next: (data: any[]) => (this.materials = data),
      error: err => {
        console.error('Erreur lors du chargement des materiels :', err);
        this.showNotification('Erreur de chargement.', 'error');
      }
    });
  }
  
  filteredMaterials(): any[] {
    if (!this.searchTerm.trim()) return this.materials;
    return this.materials.filter(material =>
      material.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

   openAddModal(): void {
    this.currentMaterial = { name: '', description: '', quantity: '', type: '' };
    this.isEditing = false;
    this.showModal = true;
  }

  openEditModal(materials: any): void {
this.currentMaterial = { 
   material_ID: materials.material_ID,
   name: materials.name,
   description: materials.description,
   quantity: materials.quantity, 
   type: materials.type ?? ''};

    this.isEditing = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
   saveMaterial(): void {
    if (!this.currentMaterial.name.trim()) {
      this.showNotification('Le nom du materiel est requis.', 'error');
      return;
    }

    if (this.isEditing && this.currentMaterial.material_ID) {
      // Modifier
      this.api.putData('materials/updateMaterial', {
        material_ID: this.currentMaterial.material_ID,
        name: this.currentMaterial.name,
        description: this.currentMaterial.description,
        quantity: this.currentMaterial.quantity,
        type: this.currentMaterial.type
       
        
      }).subscribe({
        next: () => {
          this.getMaterials();
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
      this.api.postData('materials', {
        material_ID: this.currentMaterial.material_ID,
        name: this.currentMaterial.name,
        description: this.currentMaterial.description,
        quantity: this.currentMaterial.quantity,
        type: this.currentMaterial.type      
      }).subscribe({
        next: () => {
          this.getMaterials();
          this.closeModal();
          this.showNotification('Materiel ajouté avec succès !');
        },
        error: err => {
          console.error('Erreur lors de l\'ajout :', err);
          this.showNotification('Échec de l\'ajout.', 'error');
        }
      });
    }
  }
  deleteMaterial(id: number): void {
    if (confirm('Supprimer ce materiel ?')) {
      this.api.deleteData('materials', id).subscribe({
        next: () => {
          this.getMaterials();
          this.showNotification('Materiel supprimé avec succès !');
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

