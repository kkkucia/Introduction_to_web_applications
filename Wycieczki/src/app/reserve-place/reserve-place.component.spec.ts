import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservePlaceComponent } from './reserve-place.component';

describe('ReservePlaceComponent', () => {
  let component: ReservePlaceComponent;
  let fixture: ComponentFixture<ReservePlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservePlaceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReservePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
