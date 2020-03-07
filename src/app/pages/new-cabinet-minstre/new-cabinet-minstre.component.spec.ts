import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCabinetMinstreComponent } from './new-cabinet-minstre.component';

describe('NewCabinetMinstreComponent', () => {
  let component: NewCabinetMinstreComponent;
  let fixture: ComponentFixture<NewCabinetMinstreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCabinetMinstreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCabinetMinstreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
