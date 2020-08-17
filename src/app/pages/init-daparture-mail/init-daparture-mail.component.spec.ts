import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitDapartureMAilComponent } from './init-daparture-mail.component';

describe('InitDapartureMAilComponent', () => {
  let component: InitDapartureMAilComponent;
  let fixture: ComponentFixture<InitDapartureMAilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitDapartureMAilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitDapartureMAilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
