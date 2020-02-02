import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceEntityComponent } from './new-service-entity.component';

describe('NewServiceEntityComponent', () => {
  let component: NewServiceEntityComponent;
  let fixture: ComponentFixture<NewServiceEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewServiceEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServiceEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
