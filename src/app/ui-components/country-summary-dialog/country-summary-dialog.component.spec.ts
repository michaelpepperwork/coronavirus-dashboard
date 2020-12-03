import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySummaryDialogComponent } from './country-summary-dialog.component';

describe('CountrySummaryDialogComponent', () => {
  let component: CountrySummaryDialogComponent;
  let fixture: ComponentFixture<CountrySummaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrySummaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
