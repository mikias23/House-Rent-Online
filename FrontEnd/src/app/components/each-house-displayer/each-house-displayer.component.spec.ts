import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachHouseDisplayerComponent } from './each-house-displayer.component';

describe('EachHouseDisplayerComponent', () => {
  let component: EachHouseDisplayerComponent;
  let fixture: ComponentFixture<EachHouseDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachHouseDisplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachHouseDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
