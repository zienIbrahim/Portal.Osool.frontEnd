import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTenantUserComponent } from './create-tenant-user.component';

describe('CreateTenantUserComponent', () => {
  let component: CreateTenantUserComponent;
  let fixture: ComponentFixture<CreateTenantUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTenantUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTenantUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
