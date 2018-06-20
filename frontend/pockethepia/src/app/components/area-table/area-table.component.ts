import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { Area } from '../../models/area';
import { MatTable, MatSort, MatDialog } from '@angular/material';
import { DeleteAreaModalComponent } from '../delete-area-modal/delete-area-modal.component';

@Component({
  selector: 'app-area-table',
  templateUrl: './area-table.component.html',
  styleUrls: ['./area-table.component.scss']
})
export class AreaTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Area>;
  @Output() removedArea = new EventEmitter<boolean>();
  isLoadingResults = false;
  data: Area[];
  dataSource: Area[] = [];
  displayedColumns = ['name', 'delete'];
  constructor(private accessService: AccessService, private dialog: MatDialog) { }

  ngOnInit() {
    this.sort.disableClear = true;
    this.sort.active = 'name';
    this.sort.direction = 'asc';
    this.sort.sortChange.subscribe(() => this.sortData());
    this.refresh();
  }

  public filterTable(filter: string) {
    this.dataSource = this.data.filter(u => u.name.toLowerCase().includes(filter.toLowerCase()));
  }

  public refreshData() {
    const filterBar = document.querySelector('#filter') as HTMLInputElement;
    filterBar.value = '';
    this.refresh();
  }

  public sortData() {
    const ascendingMult = this.sort.direction === 'asc' ? 1 : -1;
    this.dataSource = this.dataSource.sort((a, b) => {
      switch (this.sort.active) {
        case 'name': return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) * ascendingMult;
      }
    });
    this.table.renderRows();
  }

  private refresh() {
    this.isLoadingResults = true;
    this.accessService.getAreas().subscribe(data => {
      console.log(data);
      this.data = data;
      this.dataSource = data;
      this.sortData();
      this.isLoadingResults = false;
    }, error => {
      this.isLoadingResults = false;
    });
  }

  deleteArea(area: Area) {
    const openedDialog = this.dialog.open(DeleteAreaModalComponent, { data: area });
    openedDialog.afterClosed().subscribe(d => {
      this.refreshData();
      this.removedArea.emit(true);
    });
  }
}
