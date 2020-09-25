import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCollaboratorsComponent } from './new-collaborators/new-collaborators.component';
import { ListCollaboratorsComponent } from './list-collaborators/list-collaborators.component';

const routes: Routes = [
  { path: '', component: ListCollaboratorsComponent },
  { path: 'create', component: NewCollaboratorsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaboratorsRoutingModule { }
