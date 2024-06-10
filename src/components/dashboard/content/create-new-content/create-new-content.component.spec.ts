import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewContentComponent } from './create-new-content.component';

describe('CreateNewContentComponent', () => {
  let component: CreateNewContentComponent;
  let fixture: ComponentFixture<CreateNewContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
