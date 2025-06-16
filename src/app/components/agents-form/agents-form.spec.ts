import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsForm } from './agents-form';

describe('AgentsForm', () => {
  let component: AgentsForm;
  let fixture: ComponentFixture<AgentsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
