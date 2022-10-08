import { Component, OnInit, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BaseListComponent } from '../../../../shared/components/common/base-resource-list/base-resource-list.component';
import { CollaboratorsService } from '../service/collaborators.service';

@Component({
  selector: 'app-list-collaborators',
  templateUrl: './list-collaborators.component.html',
  styleUrls: ['./list-collaborators.component.scss']
})
export class ListCollaboratorsComponent extends BaseListComponent<any> implements OnInit{

  displayedColumns: string[] = [
    'Date',
    'Tower',
    'Activity',
    'Leader',
    'Status',
    'Comment',
    'update',
    'delete'
  ];

  constructor(
    private collaboratorsService: CollaboratorsService,
    protected injector: Injector,
    private dialog: MatDialog,
  ) { 
    super(injector, collaboratorsService);

    this.dataSource.filterPredicate = (data: any, filter) => { 
      const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(filter) != -1;
    }

  }

  ngOnInit() {
  }

}
