import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionForm } from './distribution-form';

describe('DistributionForm', () => {
  let component: DistributionForm;
  let fixture: ComponentFixture<DistributionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
