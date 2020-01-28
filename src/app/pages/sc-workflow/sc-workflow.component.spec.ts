import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScWorkflowComponent } from './sc-workflow.component';

describe('ScWorkflowComponent', () => {
  let component: ScWorkflowComponent;
  let fixture: ComponentFixture<ScWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
