import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionChartComponent } from './promotion-chart.component';

describe('PromotionChartComponent', () => {
  let component: PromotionChartComponent;
  let fixture: ComponentFixture<PromotionChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
