import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPageComponent } from './create-new-page.component';

describe('CreateNewPageComponent', () => {
  let component: CreateNewPageComponent;
  let fixture: ComponentFixture<CreateNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
