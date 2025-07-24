import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ApiServices } from "../../services/api_services";

@Component({
  selector: 'app-agents-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './distributions-list.html',
  styleUrls: ['./distributions-list.css']
})

export class DistributionsList implements OnInit {
  distributions: any[] = [];
  agents: any[] = [];
  materials: any[] = [];
  departments: any[] = [];
  services: any[] = [];
  currentDistribution: any = { agent: '', material: '', quantity: '', department: null, service:null, assigned_date: '', notes: '' };
  showModal = false;
  isEditing = false;
  return=false;
  searchTerm = '';

  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(public api: ApiServices) {}

  ngOnInit(): void {
    this.getAgents();
    this.getMaterials();
    this.getDepartments();
    this.getServices();
    this.getDistributions();
  }

  
  getAgents(): void {
    this.api.getData('agents').subscribe({
      next: (data: any[]) => (this.agents = data),
      error: err => {
        console.error('Erreur lors du chargement des agents :', err);
        this.showNotification('Erreur de chargement.', 'error');
      }
    });
  }

  getMaterials(): void {
    this.api.getData('materials').subscribe({
      next: (data: any[]) => (this.materials = data),
      error: err => {
        console.error('Erreur lors du chargement des matériaux :', err);
        this.showNotification('Erreur de chargement.', 'error');
      }
    });
  }

  getDepartments(): void {
    this.api.getData('departments').subscribe({
      next: (data: any[]) => (this.departments = data),
      error: err => {
        console.error('Erreur lors du chargement des departements :', err);
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


  getDistributions(): void {
    this.api.getData('distributions').subscribe({
      next: (data: any[]) => (this.distributions = data),
      error: err => {
        console.error('Erreur lors du chargement des distributions :', err);
        this.showNotification('Erreur de chargement.', 'error');
      }
    });
  }
  
  filteredDistributions(): any[] {
    if (!this.searchTerm.trim()) return this.distributions;
    return this.distributions.filter(distribution =>
      distribution.assigned_date.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

   openAddModal(): void {
    this.currentDistribution = {  agent: null, material: '', quantity: '', department: null, service:null, assigned_date: '', notes: '' };
    this.isEditing = false;
    this.showModal = true;
  }

  openEditModal(distributions: any): void {
this.currentDistribution = {
    id: distributions.id,
    agent: distributions.agent,
    material: distributions.material,
    quantity: distributions.quantity,
    department: distributions.department,
    service: distributions.service,
    assigned_date: distributions.assigned_date,
    notes: distributions.notes 
 };

    this.isEditing = true;
    this.showModal = true;
  }

openReturnModal(distributions: any): void {
this.currentDistribution = {
    id: distributions.id,
    agent: distributions.agent,
    material: distributions.material,
    quantity: distributions.quantity,
    department: distributions.department,
    service: distributions.service,
    assigned_date: distributions.assigned_date,
    notes: distributions.notes ,
    date_return:distributions.date_return,
    commentaire:distributions.commentaire
 };

    this.isEditing = true;
    this.return = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.return = false
  }
   saveDistribution(): void {
    if (!this.currentDistribution.assigned_date.trim()) {
      this.showNotification('La date de l agent est requise.', 'error');
      return;
    }

    if (this.isEditing && this.currentDistribution.id) {
      // Modifier
      this.api.putData('distributions/updateDistribution', {
        id: this.currentDistribution.id,
        agent: this.currentDistribution.agent ?? '',
        material: this.currentDistribution.material ?? '',
        quantity: this.currentDistribution.quantity,
        department: this.currentDistribution.department ?? '',
        service: this.currentDistribution.service ?? '',
        assigned_date: this.currentDistribution.assigned_date,
        notes: this.currentDistribution.notes,
        date_return:this.currentDistribution.date_return,
        commentaire:this.currentDistribution.commentaire
        
      }).subscribe({
        next: () => {
          this.getDistributions();
          this.closeModal();
          this.showNotification('Attribution modifiée avec succès !');
        },
        error: err => {
          console.error('Erreur lors de la modification :', err);
          this.showNotification('Échec de la modification.', 'error');
        }
      });
    } else {
      // Ajouter
      this.api.postData('distributions', {
        id: this.currentDistribution.id,
        agent: this.currentDistribution.agent,
        material: this.currentDistribution.material,
        quantity: this.currentDistribution.quantity,
        department: this.currentDistribution.department,
        service: this.currentDistribution.service,
        assigned_date: this.currentDistribution.assigned_date,
        notes: this.currentDistribution.notes
       
      }).subscribe({
        next: () => {
          this.getDistributions();
          this.closeModal();
          this.showNotification('Attribution ajoutée avec succès !');
        },
        error: err => {
          console.error('Erreur lors de l\'ajout :', err);
          this.showNotification('Échec de l\'ajout.', 'error');
        }
      });
    }
  }
  deleteDistribution(id: number): void {
    if (confirm('Supprimer cette attribution ?')) {
      this.api.deleteData('distributions', id).subscribe({
        next: () => {
          this.getDistributions();
          this.showNotification('Attribution supprimée avec succès !');
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

