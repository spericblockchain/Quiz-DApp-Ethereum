import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnivProfessorComponent } from './univ-professor.component';

describe('UnivProfessorComponent', () => {
  let component: UnivProfessorComponent;
  let fixture: ComponentFixture<UnivProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnivProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnivProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
