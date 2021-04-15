import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubCategoryFormComponent } from './admin-sub-category-form.component';

describe('AdminSubCategoryFormComponent', () => {
  let component: AdminSubCategoryFormComponent;
  let fixture: ComponentFixture<AdminSubCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubCategoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
