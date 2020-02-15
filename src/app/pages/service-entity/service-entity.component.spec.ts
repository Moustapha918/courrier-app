import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEntityComponent } from './service-entity.component';

describe('ServiceEntityComponent', () => {
  let component: ServiceEntityComponent;
  let fixture: ComponentFixture<ServiceEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
