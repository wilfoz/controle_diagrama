import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'production',
    loadChildren: () => import('./modules/planning/planning.module').then(mod => mod.PlanningModule)
  }, {
    path: 'building-list',
    loadChildren: () => import('./modules/building-list/building-list.module').then(mod => mod.BuildingListModule)
  }, {
    path: 'activities-list',
    loadChildren: () => import('./modules/activities/activity.module').then(mod => mod.ActivityModule)
  }, {
    path: 'leaders-list',
    loadChildren: () => import('./modules/leaders/leader.module').then(mod => mod.LeaderModule)
  }, {
    path: 'work-teams',
    loadChildren: () => import('./modules/work-teams/work-teams.module').then(mod => mod.WorkTeamsModule)
  }, {
    path: 'login', component: LoginComponent
  }, {
    path: 'signup', component: SignupComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
