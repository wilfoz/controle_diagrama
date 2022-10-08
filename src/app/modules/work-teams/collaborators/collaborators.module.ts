import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaboratorsRoutingModule } from './collaborators-routing.module';
import { ListCollaboratorsComponent } from './list-collaborators/list-collaborators.component';
import { CollaboratorsDetailComponent } from './collaborators-detail/collaborators-detail.component';
import { NewCollaboratorsComponent } from './new-collaborators/new-collaborators.component';
import { SharedModule } from 'src/app/shared/shared.module'

@NgModule({
  declarations: [
    ListCollaboratorsComponent,
    CollaboratorsDetailComponent,
    NewCollaboratorsComponent
  ],
  imports: [
    CommonModule,
    CollaboratorsRoutingModule,
    SharedModule
  ], entryComponents: [
    CollaboratorsDetailComponent
  ]
})
export class CollaboratorsModule { }
