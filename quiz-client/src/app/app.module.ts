import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { UniversityComponent } from './Components/university/university.component';
import { ProfessorComponent } from './Components/professor/professor.component';
import { StudentComponent } from './Components/student/student.component';
import { UnivStudentComponent } from './Components/university/univ-student/univ-student.component';
import { UnivProfessorComponent } from './Components/university/univ-professor/univ-professor.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { LoginComponent } from './Components/student/login/login.component';
import { QuizComponent } from './Components/student/quiz/quiz.component';
import { AddQuizComponent } from './Components/professor/add-quiz/add-quiz.component';
import { QuizListComponent } from './Components/professor/quiz-list/quiz-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScoreComponent } from './Components/student/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UniversityComponent,
    ProfessorComponent,
    StudentComponent,
    UnivStudentComponent,
    UnivProfessorComponent,
    NavigationComponent,
    LoginComponent,
    QuizComponent,
    AddQuizComponent,
    QuizListComponent,
    ScoreComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
