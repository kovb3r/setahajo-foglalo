import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HajoCardComponent } from './hajo-card.component';

describe('HajoCardComponent', () => {
  let component: HajoCardComponent;
  let fixture: ComponentFixture<HajoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HajoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HajoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
