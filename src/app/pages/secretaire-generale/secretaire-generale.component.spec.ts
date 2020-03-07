import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaireGeneraleComponent } from './secretaire-generale.component';

describe('SecretaireGeneraleComponent', () => {
  let component: SecretaireGeneraleComponent;
  let fixture: ComponentFixture<SecretaireGeneraleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretaireGeneraleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretaireGeneraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
