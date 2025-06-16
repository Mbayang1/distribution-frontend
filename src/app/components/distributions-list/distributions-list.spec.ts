import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DistributionsList } from './distributions-list';

describe('DistributionsList', () => {
  let component: DistributionsList;
  let fixture: ComponentFixture<DistributionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributionsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributionsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});