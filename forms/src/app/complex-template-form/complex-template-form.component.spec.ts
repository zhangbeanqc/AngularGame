import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexTemplateFormComponent } from './complex-template-form.component';

describe('ComplexTemplateFormComponent', () => {
  let component: ComplexTemplateFormComponent;
  let fixture: ComponentFixture<ComplexTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexTemplateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
