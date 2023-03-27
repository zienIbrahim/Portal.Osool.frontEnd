import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTenantGroupTypeComponent } from './add-tenant-group-type.component';

describe('AddTenantGroupTypeComponent', () => {
  let component: AddTenantGroupTypeComponent;
  let fixture: ComponentFixture<AddTenantGroupTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTenantGroupTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTenantGroupTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
