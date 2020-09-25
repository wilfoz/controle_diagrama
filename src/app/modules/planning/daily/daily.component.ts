import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailyService } from './services/daily.service';
import * as moment from 'moment';
import { Production } from '../productions/shared/production';
import { Totals } from './model/daily';
import { debounceTime, tap } from 'rxjs/operators';
import { MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ProductionsTotals } from './class/totals';
import { Activity } from '../../activities/shared/activity';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {

  public displayedColumns: string[] = ['group', 'activity', 'unity', 'foreseen', 'inDay',
    'previous', 'current', 'accumulated', 'notExecuted', 'executed', 'planned', 'leader'];

  public date = new FormControl(new Date());
  public dataSource = new MatTableDataSource();
  public productions: Production[];
  public isLoading: boolean;

  private expectedTowers: number;
  private expectedKm: number;

  constructor(
    private route: ActivatedRoute,
    private dailyService: DailyService,
  ) { }

  ngOnInit() {
    this.productions = this.route.snapshot.data.productions;
    this.dailyService.getTotalTowers().subscribe(data => this.expectedTowers = data);
    this.dailyService.getTotalKm().subscribe(data => this.expectedKm = +((data / 1000).toFixed(0)));
    this.getPDS();
  }

  getPDS = () => this.dailyService.getAll()
    .pipe(
      tap(() => {
        this.isLoading = true
      }),
      debounceTime(200)
    )
    .subscribe((data) => {
      this.composyPDS(data);
      this.isLoading = false;
    });

  changeDate = (event: MatDatepickerInputEvent<Date>) => {
    this.date.setValue(moment(event.value).format());
    this.getPDS();
  }

  composyPDS = (data) => {

    const PDS = data.map(activity => {

      const { group, name, unity } = activity;
      const productionsByDates = this.getProductionsByDatas();
      const current = productionsByDates.filter((prod) => prod.activity['name'] === activity.name);
      const leaders = this.filterLeaders(current);
      const totals = this.composyTotals(unity, name, current);

      return Object.assign({ group, name, unity, leaders: leaders.toString() }, totals)

    })

    this.dataSource.data = this.groupColumnByGroup(PDS);

  }

  composyTotals = (unity, name, current): Totals => {

    const totals = new ProductionsTotals(this.date, this.productions);

    const plannedTotal = unity === 'torre' ? this.expectedTowers : this.expectedKm;
    const totalExecuted = unity === 'torre' ? totals.totalTowerExecuted(name) : totals.totalKmExecuted(name);
    const totalExecutedInDay = unity === 'torre' ? totals.subTotalTowerExecuted(current) : totals.subTotalKmExecuted(current);

    const totalPlannedInDay = totals.subTotalTowerPlanned(current);
    const towersExecuted = totals.filterTowersExecuted(current);
    const towersPlanned = totals.filterTowersPlanned(current);

    const notExecuted = plannedTotal - totalExecuted;
    const percentage = totalExecuted / plannedTotal;
    const previousTotal = totalExecuted - totalExecutedInDay;

    return {
      plannedTotal,
      totalExecuted,
      percentage: Math.round(percentage),
      previousTotal,
      totalExecutedInDay,
      totalPlannedInDay,
      notExecuted,
      towersExecuted: towersExecuted.toString(),
      towersPlanned: towersPlanned.toString(),
    }

  };

  getProductionsByDatas = () => {

    let start = moment(this.date.value).format('YYYY-MM-DD');
    let end = moment(start).add(1, 'days').format('YYYY-MM-DD');

    const result = this.productions.filter((prod) => {

      let current = moment(prod.date).format('YYYY-MM-DD');
      let isTrue = moment(prod.date).isSameOrBefore(end) && moment(current).isSameOrAfter(start);

      return isTrue;
    })
    return result;
  }

  filterLeaders = (prod: any[]) => {

    if (prod.length > 0) {
      const leaders = prod.map(p => p.leader);
      return leaders.filter((leader, i) => leaders.indexOf(leader) === i);
    }
    return ''
  };

  groupColumnByGroup = (data) => {

    const obj = {};

    const result = data.map(pds => {

      const span = obj[pds.group] ? 0 : data.filter(act => act.group === pds.group).length;
      obj[pds.group] = true;

      return { ...pds, span };

    })
    return result
  }


}
