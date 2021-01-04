import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelOrQuitComponent } from './del-or-quit.component';

describe('DelOrQuitComponent', () => {
  let component: DelOrQuitComponent;
  let fixture: ComponentFixture<DelOrQuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelOrQuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelOrQuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
