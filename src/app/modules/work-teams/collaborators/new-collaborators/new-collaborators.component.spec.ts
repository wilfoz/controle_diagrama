import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCollaboratorsComponent } from './new-collaborators.component';

describe('NewCollaboratorsComponent', () => {
  let component: NewCollaboratorsComponent;
  let fixture: ComponentFixture<NewCollaboratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCollaboratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
