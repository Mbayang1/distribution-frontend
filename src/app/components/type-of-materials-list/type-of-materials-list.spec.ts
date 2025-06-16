import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeOfMaterialsList } from './type-of-materials-list';

describe('TypeOfMaterialsList', () => {
  let component: TypeOfMaterialsList;
  let fixture: ComponentFixture<TypeOfMaterialsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeOfMaterialsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOfMaterialsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});