import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSecretaireGeneraleComponent } from './new-secretaire-generale.component';

describe('NewSecretaireGeneraleComponent', () => {
  let component: NewSecretaireGeneraleComponent;
  let fixture: ComponentFixture<NewSecretaireGeneraleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSecretaireGeneraleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSecretaireGeneraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
