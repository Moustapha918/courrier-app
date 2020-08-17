import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureMailScComponent } from './departure-mail-sc.component';

describe('DepartureMailScComponent', () => {
  let component: DepartureMailScComponent;
  let fixture: ComponentFixture<DepartureMailScComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartureMailScComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureMailScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
