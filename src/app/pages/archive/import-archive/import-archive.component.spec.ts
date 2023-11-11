import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportArchiveComponent } from './import-archive.component';

describe('ImportArchiveComponent', () => {
  let component: ImportArchiveComponent;
  let fixture: ComponentFixture<ImportArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
