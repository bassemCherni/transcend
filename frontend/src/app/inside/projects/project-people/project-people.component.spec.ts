import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPeopleComponent } from './project-people.component';

describe('ProjectPeopleComponent', () => {
  let component: ProjectPeopleComponent;
  let fixture: ComponentFixture<ProjectPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
