import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDilaogComponent } from './error-dilaog.component';

describe('ErrorDilaogComponent', () => {
  let component: ErrorDilaogComponent;
  let fixture: ComponentFixture<ErrorDilaogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDilaogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDilaogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
