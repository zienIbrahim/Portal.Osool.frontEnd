import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantGroupTypeListComponent } from './tenant-group-type-list.component';

describe('TenantGroupTypeListComponent', () => {
  let component: TenantGroupTypeListComponent;
  let fixture: ComponentFixture<TenantGroupTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantGroupTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantGroupTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
