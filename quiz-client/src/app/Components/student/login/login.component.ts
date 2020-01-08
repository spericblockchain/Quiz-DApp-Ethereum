import { Component, OnInit, DoCheck, Input } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { NgForm } from '@angular/forms'
import { Web3Model } from 'src/app/Models/web3.model'
import { ApiService } from 'src/app/Services/api/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  account: any;
  quiz: any;
  studId: any;
  studBatch: any;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(map(result => result.matches));

  constructor(
    private web3service: Web3Service,
    private breakpointObserver: BreakpointObserver,
    private route: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.web3service.Web3Details$.subscribe(async (data: Web3Model) => {
      this.account = data.account;
      this.quiz = data.quiz;
    });
    this.studId = sessionStorage.getItem('studId');
    this.studBatch = sessionStorage.getItem('Batch');
  }

  onSubmit = async (form: NgForm) => {
    try {
      const quizId = form.value.quizId;
      sessionStorage.setItem('quizId', quizId);

      const quizBatch = await this.quiz
        .QuizBatch(quizId)
        .call({ from: this.account });
      const submit = await this.quiz
        .getSubmit(this.studId, quizId)

        .call({ from: this.account });
      if (this.studBatch === quizBatch) {
        if (submit !== '1') {
          console.log('INSIDE THE SUBMIT SESSION');
          alert('Click OK to Begin the Quiz');
          const dat = await this.api.setSubmit(this.studId, quizId);
          this.route.navigateByUrl('/student/quiz');
        } else {
          alert('You have Already attended this Quiz');
          this.logOut();
        }
      } else {
        alert('This quizId is not assigned for this student');
        this.logOut();
      }
    } catch (error) {
      console.log(error);
    }
  };

  logOut = async () => {
    sessionStorage.clear();
    this.web3service.web3logout();
    this.route.navigateByUrl('/');
  };
}
