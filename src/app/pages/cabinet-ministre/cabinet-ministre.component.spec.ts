import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetMinistreComponent } from './cabinet-ministre.component';

describe('CabinetMinistreComponent', () => {
  let component: CabinetMinistreComponent;
  let fixture: ComponentFixture<CabinetMinistreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinetMinistreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetMinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
