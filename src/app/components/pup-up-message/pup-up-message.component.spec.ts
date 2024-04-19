import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupUpMessageComponent } from './pup-up-message.component';

describe('PupUpMessageComponent', () => {
  let component: PupUpMessageComponent;
  let fixture: ComponentFixture<PupUpMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PupUpMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PupUpMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
