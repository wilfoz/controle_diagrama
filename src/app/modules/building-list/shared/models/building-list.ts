import { BaseResourceModel } from '../../../../shared/model/base-resource.model';

export class BuildingList extends BaseResourceModel {

  constructor(
    public project?: number,
    public name?: string,
    public type?: string,
    public height?: number,
    public locality?: string,
    public coordinates?: string,
    public forward?: number,
    public released?: string,
    public foundation_MC? : string,
    public foundation_A? : string,
    public foundation_B? : string,
    public foundation_C? : string,
    public foundation_D? : string,
    // tslint:disable-next-line:variable-name
    public _id?: string,
  ) {
  super();
}

static fromJson(jsonData: any): BuildingList {
  return Object.assign( new BuildingList(), jsonData);
}

}
