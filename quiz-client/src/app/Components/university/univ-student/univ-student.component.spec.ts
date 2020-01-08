import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnivStudentComponent } from './univ-student.component';

describe('UnivStudentComponent', () => {
  let component: UnivStudentComponent;
  let fixture: ComponentFixture<UnivStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnivStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnivStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
