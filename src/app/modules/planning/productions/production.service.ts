import { Injectable, Injector } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { BaseResourceService } from 'src/app/shared/service/base-service-resource';
import { Production } from './shared/production';
import { BuildingListService } from '../../building-list/shared/building-list.service';
import { ActivityService } from '../../activities/activity.service';
import { LeadersService } from '../../leaders/leaders.service';
import { BuildingList } from '../../building-list/shared/models/building-list';
import { Activity } from '../../activities/shared/activity';
import { Leader } from '../../leaders/shared/leader';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductionService extends BaseResourceService<Production> {
  
  private towers$ = new BehaviorSubject<BuildingList[]>([]);
  private activities$ = new BehaviorSubject<Activity[]>([]);

  constructor(
    protected injector: Injector,
    private buildingListService: BuildingListService,
    private activityService: ActivityService,
    private leadersService: LeadersService,
    ) {
    super('http://localhost:3000/api/productions', injector, Production.fromJson);
  }

  getAllProductions(): Observable<Production[]> {
    return this.getAll();
  }

  getAllTowers(): Observable<BuildingList[]> {
    this.buildingListService.getAll().subscribe(this.towers$);
    return this.towers$.asObservable();
  }

  getAllActivities(): Observable<Activity[]> {
    this.activityService.getAll().subscribe(this.activities$);
    return this.activities$.asObservable();
  }

  getAllLeaders(): Observable<Leader[]> {
    return this.leadersService.getAll();
  }

  getActivityIDByName = (desc) => this.getAllActivities().subscribe(activites => activites.find(act => act.name === desc)._id);

  getTowerIDByName = (tower) => {
    return this.getAllActivities().subscribe(activites => activites.find(act => act.name === tower)._id)
  };
  

}
