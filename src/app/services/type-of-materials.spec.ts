import { TestBed } from '@angular/core/testing';
import { TypeOfMaterialsService } from './type-of-materials.service';

describe('TypeOfMaterialsService', () => {
  let service: TypeOfMaterialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOfMaterialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});