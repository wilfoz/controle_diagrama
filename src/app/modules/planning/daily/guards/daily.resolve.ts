import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { ProductionService } from '../../productions/production.service';

@Injectable({
  providedIn: 'root'
})
export class DailyResolverGuard implements Resolve<Observable<any>> {

  constructor(private productionService: ProductionService) { }

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return this.productionService.getAll().pipe(
      take(1),
      //tap(console.log)
    );
  }
  
}
