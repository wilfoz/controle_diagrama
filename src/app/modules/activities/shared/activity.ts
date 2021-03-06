import { BaseResourceModel } from '../../../shared/model/base-resource.model';

export class Activity extends BaseResourceModel {

  constructor(
    public item?: string,
    public name?: string,
    public unity?: string,
    public group?: string,
    public mark?: string,
    public _id?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): Activity {
    return Object.assign(new Activity(), jsonData);
  }

}
