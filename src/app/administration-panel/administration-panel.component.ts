import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { TeamService } from '../service/team.service'; // Assuming TeamService fetches team data

@Component({
  selector: 'app-administration-panel',
  templateUrl: './administration-panel.component.html',
  styleUrls: ['./administration-panel.component.scss'],
})
export class AdministrationPanelComponent implements OnInit {
  teamsData: any[] = [];
  rolesData: { role: string; count: number }[] = [];

  constructor(private dataService: DataService, private teamService: TeamService) {}

  ngOnInit(): void {
    this.loadRolesData();
    this.fetchTeamsData();
  }

  loadRolesData(): void {
    this.dataService.getRolesData().subscribe((data: any) => {
      // Assuming roles data is received as an array or can be converted to an array
      if (Array.isArray(data)) {
        this.rolesData = data;
      } else {
        console.error('Invalid roles data format:', data);
      }
    });
  }

  fetchTeamsData(): void {
    this.teamService.getAllTeams().subscribe((teamsResponse: any) => {
      // Check if the teams data is an array before assigning it
      if (Array.isArray(teamsResponse.teams)) {
        this.teamsData = teamsResponse.teams;
      } else {
        console.error('Invalid teams data format:', teamsResponse);
      }
    });
  }

}
