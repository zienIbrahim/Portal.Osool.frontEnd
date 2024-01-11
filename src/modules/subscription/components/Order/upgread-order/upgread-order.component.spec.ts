import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgreadOrderComponent } from './upgread-order.component';

describe('UpgreadOrderComponent', () => {
  let component: UpgreadOrderComponent;
  let fixture: ComponentFixture<UpgreadOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgreadOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgreadOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
