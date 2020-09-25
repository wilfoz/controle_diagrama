import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeeklyComponent } from './weekly/weekly.component';
import { ProductionMonitoringComponent } from './production-monitoring/production-monitoring.component';
import { ProductionMonitoringResolver } from './production-monitoring/guards/production-monitoring.resolver';
import { DailyComponent } from '../planning/daily/daily.component';
import { DailyResolverGuard } from './daily/guards/daily.resolve';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./productions/production.module').then(mod => mod.ProductionModule)
    }, {
        path: 'week', component: WeeklyComponent
    }, {
        path: 'monitoring', component: ProductionMonitoringComponent, resolve: { prod: ProductionMonitoringResolver }
    }, {
        path: 'daily', component: DailyComponent, resolve: { productions: DailyResolverGuard }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ ProductionMonitoringResolver ]
})
export class PlanningRoutingModule { }
