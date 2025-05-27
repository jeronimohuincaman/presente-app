import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraLocationPage } from './camera-location.page';

describe('CameraLocationPage', () => {
  let component: CameraLocationPage;
  let fixture: ComponentFixture<CameraLocationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
