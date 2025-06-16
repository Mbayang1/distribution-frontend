import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsService } from '../../services/agents.service';

@Component({
  selector: 'app-agents-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agents-list.html',
  styleUrls: ['./agents-list.css']
})
export class AgentsList implements OnInit {
  agents: any[] = [];

  constructor(private agentsService: AgentsService) {}

  ngOnInit() {
    this.agentsService.getAgents().subscribe((data: any[]) => {
      this.agents = data;
    });
  }
}