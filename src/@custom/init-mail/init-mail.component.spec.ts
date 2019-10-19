import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitMailComponent } from './init-mail.component';

describe('InitMailComponent', () => {
  let component: InitMailComponent;
  let fixture: ComponentFixture<InitMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
