// team-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamService.getAllTeams().subscribe((teams: Team[]) => {
      this.teams = teams;
    });
  }
}
