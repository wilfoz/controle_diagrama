import { Injectable, Injector } from '@angular/core';
import { Production } from '../../../planning/productions/shared/production';
import { BaseResourceService } from '../../../../shared/service/base-service-resource';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService  extends BaseResourceService<Production>{

  constructor(protected injector: Injector) {
    super('http://localhost:3000/api/leaders', injector, Production.fromJson);
  }

}
