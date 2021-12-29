import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTemplateFormComponent } from './simple-template-form.component';

describe('SimpleTemplateFormComponent', () => {
  let component: SimpleTemplateFormComponent;
  let fixture: ComponentFixture<SimpleTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleTemplateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
