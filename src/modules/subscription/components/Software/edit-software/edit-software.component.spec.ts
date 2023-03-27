import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSoftwareComponent } from './edit-software.component';

describe('EditSoftwareComponent', () => {
  let component: EditSoftwareComponent;
  let fixture: ComponentFixture<EditSoftwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSoftwareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
