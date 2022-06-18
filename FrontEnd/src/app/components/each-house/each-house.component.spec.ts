import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachHouseComponent } from './each-house.component';

describe('EachHouseComponent', () => {
  let component: EachHouseComponent;
  let fixture: ComponentFixture<EachHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
