import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionLayoutComponent } from './subscription-layout.component';

describe('SubscriptionLayoutComponent', () => {
  let component: SubscriptionLayoutComponent;
  let fixture: ComponentFixture<SubscriptionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
