import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Production } from '../shared/production';
import { ProductionService } from '../production.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productions-detail',
  templateUrl: './productions-detail.component.html',
  styleUrls: ['./productions-detail.component.css']
})
export class ProductionsDetailComponent implements OnInit {

  public title = 'Edit Production';
  public form: FormGroup;

  private towersSub: Subscription;
  private activitiesSub: Subscription;

  private towers: any[] = [];
  private activities: any[] = [];

  constructor(
    private productionService: ProductionService,
    private dialogRef: MatDialogRef<ProductionsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public production: Production,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.listsActivities();
    this.listsTowers();
  }

  buildForm = () => {
    this.form = new FormGroup({
      id: new FormControl(this.production._id),
      date: new FormControl(this.production.date, Validators.required),
      tower: new FormControl(this.production.tower, Validators.required),
      activity: new FormControl(this.production.activity, Validators.required),
      leader: new FormControl(this.production.leader, Validators.required),
      status: new FormControl(this.production.status, Validators.required),
      comment: new FormControl(this.production.comment),
    });
  }

  save = () => {
    if (this.form.invalid) {
      return;
    }
    const newList = this.setProductionList(this.form.value);
    this.dialogRef.close(newList);
  }

  close = () => {
    this.dialogRef.close(null);
  }

  setProductionList = (form) => {
    const tower_id = this.towers.find(tower => tower.name === form.tower)._id;
    const activity_id = this.activities.find(activity => activity.name === form.activity)._id;

    const { id: _id, date, tower, activity, leader, status, comment } = form;
    return Object.assign({ _id, date, tower, activity, leader, status, comment }, { tower_id }, { activity_id });

  }

  listsActivities = () => {
    this.activitiesSub = this.productionService.getAllActivities()
      .subscribe(
        (res) => this.mapToResource(res, this.activities)
      );
  }

  listsTowers = () => {
    this.towersSub = this.productionService.getAllTowers()
      .subscribe(
        (res) => this.mapToResource(res, this.towers)
      );
  }

  mapToResource = (res, arr) => res.map((resource) => {
    arr.push(resource);
  })

  ngOnDestroy(): void {
    this.towersSub.unsubscribe();
    this.activitiesSub.unsubscribe();
  }

}
