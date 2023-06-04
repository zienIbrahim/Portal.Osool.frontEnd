import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSubscriptionComponent } from './tenant-subscription.component';

describe('TenantSubscriptionComponent', () => {
  let component: TenantSubscriptionComponent;
  let fixture: ComponentFixture<TenantSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
