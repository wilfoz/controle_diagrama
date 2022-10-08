import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { BuildingList } from '../shared/models/building-list';
import { BuildingListService } from '../building-list.service'
import { BaseListComponent } from '../../../shared/components/common/base-resource-list/base-resource-list.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ListDetailComponent } from '../list-detail/list-detail.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseListComponent<BuildingList> implements OnInit {

  displayedColumns: string[] = [
    'project',
    'tower',
    'type',
    'height',
    'coords',
    'vao',
    'locality',
    'status',
    'foundation_MC',
    'foundation_A',
    'foundation_B',
    'foundation_C',
    'foundation_D',
    'update',
    'delete'
  ];

  constructor(
    private buildingListService: BuildingListService,
    protected injector: Injector,
    private dialog: MatDialog
  ) {
    super(injector, buildingListService);
  }

  ngOnInit () {
    this.buildingListService.getAll()
      .subscribe(data => this.dataSource.data = data.sort((a: any, b: any) => a.project - b.project));
  }

  createListForExcel = (list: any) => {
    list.map((l) => {
      if (l[0] !== undefined) {
        const line: BuildingList = {
          project: l[0],
          name: l[1],
          type: l[2],
          height: l[3],
          locality: l[4],
          coordinates: `${l[5], l[6]}`,
          forward: l[7],
          released: l[8],
          foundation_MC: l[9],
          foundation_A: l[10],
          foundation_B: l[11],
          foundation_C: l[12],
          foundation_D: l[13],
        };
        console.log(line)
        this.createListItem(line);
      }
    });
  }

  receiverData(event) {
    this.createListForExcel(event);
    this.notify('Atualizado');
  }

  createListItem(line: any) {
    this.buildingListService.create(line).subscribe(data => data);
  }

  editContact(element): void {
    const id: string = element._id;
    this.buildingListService.getById(id).subscribe(data => {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '450px';
        dialogConfig.width = '450px';
        dialogConfig.data = data;

        const dialogRef = this.dialog.open(ListDetailComponent, dialogConfig);
        dialogRef.afterClosed()
        .subscribe(result => {
            if (!result) {
                return;
            }
            this.buildingListService.update(result)
            .pipe(
              tap(() => this.notify('Cadastro Atualizado!'))
            )
                .subscribe(_ => this.getAllResources());
        });
    });
}

}
