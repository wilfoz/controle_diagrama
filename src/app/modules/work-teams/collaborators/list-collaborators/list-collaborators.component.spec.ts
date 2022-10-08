import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCollaboratorsComponent } from './list-collaborators.component';

describe('ListCollaboratorsComponent', () => {
  let component: ListCollaboratorsComponent;
  let fixture: ComponentFixture<ListCollaboratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCollaboratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
