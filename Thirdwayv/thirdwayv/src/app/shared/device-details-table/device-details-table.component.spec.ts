import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDetailsTableComponent } from './device-details-table.component';

describe('DeviceDetailsTableComponent', () => {
  let component: DeviceDetailsTableComponent;
  let fixture: ComponentFixture<DeviceDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceDetailsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
