import { Component, OnInit } from '@angular/core'
import { Web3Model } from 'src/app/Models/web3.model'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Router } from '@angular/router'
import {
  NgForm,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms'
import { ApiService } from 'src/app/Services/api/api.service'
import { Observable } from 'rxjs'
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quiz: any;
  current: any;
  count = 0;
  studId: any;
  quizId: any;
  ques = {
    id: '',
    quest: '',
    op1: '',
    op2: '',
    op3: '',
    op4: ''
  };
  answer = [];
  fi: any;
  q = [];
  account: any;
  form: FormGroup;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(map(result => result.matches));

  constructor(
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private web3service: Web3Service,
    private route: Router,
    private api: ApiService
  ) {}
  ngOnInit() {
    this.web3service.Web3Details$.subscribe(async (data: Web3Model) => {
      this.account = data.account;
      this.quiz = data.quiz;
    });
    this.form = this.fb.group({
      answers: this.fb.control['']
    });
    this.studId = parseInt(sessionStorage.getItem('studId'));
    this.quizId = parseInt(sessionStorage.getItem('quizId'));
    this.assign();
  }
  assign = async () => {
    try {
      const quest = [];
      const ques: any = await this.api.getQuiz(this.quizId);
      if (ques) {
        const q = JSON.parse(ques.quiz);
        for (let i = 0; i < q.length; i++) {
          quest.push({
            id: parseInt(q[i].id),
            quest: q[i].quest,
            op1: q[i].op1,
            op2: q[i].op2,
            op3: q[i].op3,
            op4: q[i].op4,
            a: ''
          });
        }
        this.q = quest;
        this.init();
      }
    } catch (error) {
      console.log('TCL: QuizListComponent -> assign -> error', error);
    }
  };
  init = async () => {
    this.current = this.q[this.count].id;
    this.ques = {
      id: this.q[this.count].id,
      quest: this.q[this.count].quest,
      op1: this.q[this.count].op1,
      op2: this.q[this.count].op2,
      op3: this.q[this.count].op3,
      op4: this.q[this.count].op4
    };

    const submit = await this.quiz
      .getSubmit(this.studId, this.quizId)
      .call({ from: this.account });
    console.log('TCL: LoginComponent -> onSubmit -> submit', submit);
    this.fi = localStorage.getItem(this.ques.id);
  };
  result = async () => {
    return new Promise(async (resolve, reject) => {
      const resu = await this.quiz
        .getScore(this.studId, this.quizId)
        .call({ from: this.account });
      resolve(resu);
    });
  };
  onSubmit = async () => {
    try {
      let final = {};
      for (let i = 0; i <= this.count; i++) {
        let val = localStorage.getItem(JSON.stringify(i + 1));
        final[JSON.stringify(i + 1)] = val;
      }
      // const data = await this.finalSubmit(final);
      const data: any = await this.api.postQuiz(
        final,
        this.studId,
        this.quizId
      );
      const submit = await this.quiz
        .getSubmit(this.studId, this.quizId)
        .call({ from: this.account });
      console.log('TCL: LoginComponent -> onSubmit -> submit', submit);
      if (confirm('Your Quiz is Submitted')) {
        localStorage.clear();
        this.route.navigateByUrl('/student');
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
  prev = async () => {
    this.count--;
    for (let i: any  = 1; i <= 4; i++) {
      let a = document.getElementById(i) as HTMLInputElement
      console.log('TCL: QuizComponent -> prev -> a', a.checked)
      a.checked = false;
    }
    this.init();
  };
  next = async () => {
    this.count++;
    for (let i:any  = 1; i <= 4; i++) {
      let b = document.getElementById(i) as HTMLInputElement
      console.log('TCL: QuizComponent -> next -> b', b)
      b.checked = false;
    }
    this.init();
  };

  onSelect(event, n, a) {
    localStorage.setItem(n, a);
  }
}
