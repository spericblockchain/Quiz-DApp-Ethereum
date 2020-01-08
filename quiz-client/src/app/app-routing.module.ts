import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { UniversityComponent } from './Components/university/university.component';
import { ProfessorComponent } from './Components/professor/professor.component';
import { StudentComponent } from './Components/student/student.component';
import { UnivProfessorComponent } from './Components/university/univ-professor/univ-professor.component';
import { UnivStudentComponent } from './Components/university/univ-student/univ-student.component';
import { LoginComponent } from './Components/student/login/login.component';
import { QuizComponent } from './Components/student/quiz/quiz.component';
import { QuizListComponent } from './Components/professor/quiz-list/quiz-list.component';
import { AddQuizComponent } from './Components/professor/add-quiz/add-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversityGuard } from './Guards/University/university.guard';
import { ProfessorGuard } from './Guards/Professor/professor.guard';
import { StudentGuard } from './Guards/Student/student.guard';
import { ScoreComponent } from './Components/student/score/score.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'university',
    component: UniversityComponent,
    canActivate: [ UniversityGuard ],
    children: [
      {
        path: '',
        component: UnivProfessorComponent
      },
      {
        path: 'univStudent',
        component: UnivStudentComponent
      }
    ]
  },
  {
    path: 'professor',
    component: ProfessorComponent,
    canActivate: [ ProfessorGuard ],
    children: [
      {
        path: '',
        component: QuizListComponent
      },
      {
        path: 'addQuiz',
        component: AddQuizComponent
      }
    ]
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [ StudentGuard ],
    children: [
      {
        path: '',
        component: ScoreComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'quiz',
        component: QuizComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
