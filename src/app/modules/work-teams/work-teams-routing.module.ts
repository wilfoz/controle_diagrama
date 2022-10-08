import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesAndEquipmentComponent } from './vehicles-and-equipment/vehicles-and-equipment.component';
import { WorkTeamsComponent } from './work-teams.component';

const routes: Routes = [
  { path: '', component: WorkTeamsComponent },
  { path: 'collaborators', loadChildren: () => import('./collaborators/collaborators.module').then(mod => mod.CollaboratorsModule)},
  { path: 'vehicles', component: VehiclesAndEquipmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkTeamsRoutingModule { }
