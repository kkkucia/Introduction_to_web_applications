import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRatingComponent } from './travel-rating.component';

describe('TravelRatingComponent', () => {
  let component: TravelRatingComponent;
  let fixture: ComponentFixture<TravelRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelRatingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TravelRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
