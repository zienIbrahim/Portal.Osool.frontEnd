import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantTenantListComponent } from './tenant-tenant-list.component';

describe('TenantTenantListComponent', () => {
  let component: TenantTenantListComponent;
  let fixture: ComponentFixture<TenantTenantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantTenantListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantTenantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
