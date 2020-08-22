import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingDepartureMailComponent } from './viewing-departure-mail.component';

describe('ViewingDepartureMailComponent', () => {
  let component: ViewingDepartureMailComponent;
  let fixture: ComponentFixture<ViewingDepartureMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewingDepartureMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewingDepartureMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
