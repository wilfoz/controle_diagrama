import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../../../shared/service/base-service-resource';
import { Activity } from '../../../activities/shared/activity';
import { tap, take, map } from 'rxjs/operators';
import { BuildingListService } from '../../../building-list/shared/building-list.service';

const URL = 'http://localhost:3000/production/';

@Injectable({
  providedIn: 'root'
})
export class DailyService extends BaseResourceService<Activity>{

  constructor(
    protected injector: Injector,
    private buildingListService: BuildingListService

  ) {
    super('http://localhost:3000/activity', injector, Activity.fromJson);
  }

  getTotalTowers = () => {
    return this.buildingListService.getAll()
      .pipe(
        map((data) => data.filter((d) => d.name !== '').length)
      )
  }

  getTotalKm = () => {
    return this.buildingListService.getAll()
      .pipe(
        map((data) => data.reduce((acc, value) => (Math.round(acc + value.forward)), 0)
      ))
  }



}
