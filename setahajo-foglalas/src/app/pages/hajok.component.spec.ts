import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HajokComponent } from './hajok.component';

describe('HajokComponent', () => {
  let component: HajokComponent;
  let fixture: ComponentFixture<HajokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HajokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HajokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
