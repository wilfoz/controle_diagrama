import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductionMonitoringService } from '../production-monitoring.service';
import { tap, map, catchError, take } from 'rxjs/operators';
import { Production } from '../../productions/shared/production';

@Injectable({
    providedIn: 'root'
})
export class ProductionMonitoringResolver implements Resolve<Observable<any>> {

    constructor(private productionsMonitoringService: ProductionMonitoringService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable< string | Production[]> {

        return this.productionsMonitoringService.getAll().pipe(
            take(1),
            map(data => data.filter(element => element.status === 'EXECUTADO')),
            map((data) => {
                let productions = data.map((element) => {
                    const { tower, activity, comment } = element;
                    return {
                        tower: tower['name'],
                        type: tower['type'],
                        activity: activity['name'],
                        group: activity['group'],
                        mark: activity['mark'],
                        comment
                    }
                })
                return productions
            }),
            catchError((error) => {
                return of('No data');
            })
        )
    }

}