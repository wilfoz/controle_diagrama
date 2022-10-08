import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsDetailComponent } from './collaborators-detail.component';

describe('CollaboratorsDetailComponent', () => {
  let component: CollaboratorsDetailComponent;
  let fixture: ComponentFixture<CollaboratorsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
