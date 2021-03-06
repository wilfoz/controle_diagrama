import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { PlanningRoutingModule } from './planning-routing.module';
import { WeeklyComponent } from './weekly/weekly.component';
import { ProductionMonitoringComponent } from './production-monitoring/production-monitoring.component';
import { CivilComponent } from './production-monitoring/shared/svg/civil/civil.component';
import { AssemblyComponent } from './production-monitoring/shared/svg/assembly/assembly.component';
import { EmbargoesComponent } from './production-monitoring/shared/svg/embargoes/embargoes.component';
import { InfoDetailComponent } from './production-monitoring/shared/modal/info/app-info-detail.component';
import { DailyComponent } from '../planning/daily/daily.component';

@NgModule({
  declarations: [
    WeeklyComponent,
    ProductionMonitoringComponent,
    CivilComponent,
    AssemblyComponent,
    EmbargoesComponent,
    InfoDetailComponent,
    DailyComponent
  ],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    SharedModule
  ], entryComponents: [
    InfoDetailComponent
  ]
})
export class PlanningModule { }