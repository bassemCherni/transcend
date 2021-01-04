import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksapceIconComponent } from './worksapce-icon.component';

describe('WorksapceIconComponent', () => {
  let component: WorksapceIconComponent;
  let fixture: ComponentFixture<WorksapceIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksapceIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksapceIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
