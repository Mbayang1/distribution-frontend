import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfMaterialForm } from './type-of-material-form';

describe('TypeOfMaterialForm', () => {
  let component: TypeOfMaterialForm;
  let fixture: ComponentFixture<TypeOfMaterialForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeOfMaterialForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOfMaterialForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
