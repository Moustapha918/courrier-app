import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizePdfComponent } from './visualize-pdf.component';

describe('VisualizePdfComponent', () => {
  let component: VisualizePdfComponent;
  let fixture: ComponentFixture<VisualizePdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizePdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
