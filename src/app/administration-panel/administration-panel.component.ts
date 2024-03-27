import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-administration-panel',
  templateUrl: './administration-panel.component.html',
  styleUrls: ['./administration-panel.component.scss'],
})
export class AdministrationPanelComponent implements OnInit {
  rolesData: { role: string; count: number }[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadRolesData();
  }

  loadRolesData(): void {
    this.dataService.getRolesData().subscribe(data => {
      this.rolesData = data;
    });
  }
}
