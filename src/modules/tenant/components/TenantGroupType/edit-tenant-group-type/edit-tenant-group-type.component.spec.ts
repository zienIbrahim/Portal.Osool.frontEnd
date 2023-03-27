import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTenantGroupTypeComponent } from './edit-tenant-group-type.component';

describe('EditTenantGroupTypeComponent', () => {
  let component: EditTenantGroupTypeComponent;
  let fixture: ComponentFixture<EditTenantGroupTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTenantGroupTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTenantGroupTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
