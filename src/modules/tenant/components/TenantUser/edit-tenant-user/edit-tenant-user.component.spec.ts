import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTenantUserComponent } from './edit-tenant-user.component';

describe('EditTenantUserComponent', () => {
  let component: EditTenantUserComponent;
  let fixture: ComponentFixture<EditTenantUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTenantUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTenantUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
