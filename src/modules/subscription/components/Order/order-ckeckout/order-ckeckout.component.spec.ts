import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCkeckoutComponent } from './order-ckeckout.component';

describe('OrderCkeckoutComponent', () => {
  let component: OrderCkeckoutComponent;
  let fixture: ComponentFixture<OrderCkeckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCkeckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCkeckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
