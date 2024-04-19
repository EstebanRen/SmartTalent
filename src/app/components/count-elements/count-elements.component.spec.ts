import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountElementsComponent } from './count-elements.component';

describe('CountElementsComponent', () => {
  let component: CountElementsComponent;
  let fixture: ComponentFixture<CountElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountElementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
