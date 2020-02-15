import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDepartementComponent } from './new-departement.component';

describe('NewDepartementComponent', () => {
  let component: NewDepartementComponent;
  let fixture: ComponentFixture<NewDepartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDepartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
