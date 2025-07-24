import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ApiServices } from "../../services/api_services";

@Component({
  selector: 'app-agents-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agents-list.html',
  styleUrls: ['./agents-list.css']
})

export class AgentsList implements OnInit {
  agents: any[] = [];
  services: any[] = [];
  departments: any[] = [];
  currentAgent: any = {  nom: '', service: 0, prenom: '', matricule: 0, department: 0, telephone: ''};
  showModal = false;
  isEditing = false;
  searchTerm = '';

  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(public api: ApiServices) {}

  ngOnInit(): void {
    this.getDepartments();
    this.getServices();
    this.getAgents();
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

  
  getAgents(): void {
    this.api.getData('agents').subscribe({
      next: (data: any[]) => (this.agents = data),
      error: err => {
        console.error('Erreur lors du chargement des agents :', err);
        this.showNotification('Erreur de chargement.', 'error');
      }
    });
  }
  
  filteredAgents(): any[] {
    if (!this.searchTerm.trim()) return this.agents;
    return this.agents.filter(agent =>
      agent.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

   openAddModal(): void {
    this.currentAgent = { nom: '', service: '', prenom: '', matricule: '', department: '', telephone: '' };
    this.isEditing = false;
    this.showModal = true;
  }

  openEditModal(agents: any): void {
this.currentAgent = {
   agent_ID: agents.agent_ID,
   nom: agents.nom, 
   service: agents.service ?? '',
   prenom: agents.prenom,
   matricule: agents.matricule,
   department: agents.department,
   telephone: agents.telephone,};

    this.isEditing = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
   saveAgent(): void {
    if (!this.currentAgent.prenom.trim()) {
      this.showNotification('Le nom de l agent est requis.', 'error');
      return;
    }

    if (this.isEditing && this.currentAgent.agent_ID) {
      // Modifier
      this.api.putData('agents/updateAgent', {
        agent_ID: this.currentAgent.agent_ID,
        nom: this.currentAgent.nom,
        prenom: this.currentAgent.prenom,
        matricule: this.currentAgent.matricule,
        service: this.currentAgent.service,
        department: this.currentAgent.department,
        telephone: this.currentAgent.telephone,
      }).subscribe({
        next: () => {
          this.getAgents();
          this.closeModal();
          this.showNotification('Agent modifié avec succès !');
        },
        error: err => {
          console.error('Erreur lors de la modification :', err);
          this.showNotification('Échec de la modification.', 'error');
        }
      });
    } else {
      // Ajouter
      this.api.postData('agents', {
        nom: this.currentAgent.nom,
        service: this.currentAgent.service,
        prenom: this.currentAgent.prenom,
        matricule: this.currentAgent.matricule,
        department: this.currentAgent.department,
        telephone: this.currentAgent.telephone
      }).subscribe({
        next: () => {
          this.getAgents();
          this.closeModal();
          this.showNotification('Agent ajouté avec succès !');
        },
        error: err => {
          console.error('Erreur lors de l\'ajout :', err);
          this.showNotification('Échec de l\'ajout.', 'error');
        }
      });
    }
  }
  deleteAgent(id: number): void {
    if (confirm('Supprimer cet agent ?')) {
      this.api.deleteData('agents', id).subscribe({
        next: () => {
          this.getAgents();
          this.showNotification('Agent supprimé avec succès !');
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

