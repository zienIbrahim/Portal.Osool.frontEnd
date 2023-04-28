import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewUserToTenantComponent } from './add-new-user-to-tenant.component';

describe('AddNewUserToTenantComponent', () => {
  let component: AddNewUserToTenantComponent;
  let fixture: ComponentFixture<AddNewUserToTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewUserToTenantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewUserToTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
