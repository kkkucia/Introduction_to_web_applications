import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTravelComponent } from './single-travel.component';

describe('SingleTravelComponent', () => {
  let component: SingleTravelComponent;
  let fixture: ComponentFixture<SingleTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleTravelComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SingleTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
