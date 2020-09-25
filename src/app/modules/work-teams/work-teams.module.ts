import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkTeamsRoutingModule } from './work-teams-routing.module';
import { WorkTeamsComponent } from './work-teams.component';
import { VehiclesAndEquipmentComponent } from './vehicles-and-equipment/vehicles-and-equipment.component';

@NgModule({
  declarations: [
    WorkTeamsComponent,
    VehiclesAndEquipmentComponent,
  ],
  imports: [
    CommonModule,
    WorkTeamsRoutingModule,
  ]
})
export class WorkTeamsModule { }
