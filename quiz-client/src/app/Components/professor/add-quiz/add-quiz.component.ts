import { Component, OnInit } from '@angular/core'
import { question } from 'src/app/Models/question.model'
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
  question: question[] = [];
  account: any;
  quiz: any;
  quizName: any;
  batch: any;
  quizData: any;
  answer: any = [];
  questions: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private web3service: Web3Service
  ) { }
  ngOnInit() {
    this.web3service.Web3Details$.subscribe(async (data: Web3Model) => {
      this.account = data.account;
      this.quiz = data.quiz;
    });

    this.questions = this.fb.group({
      question: this.fb.array([
        new FormGroup({
          id: new FormControl(1),
          quest: new FormControl(),
          op1: new FormControl(),
          op2: new FormControl(),
          op3: new FormControl(),
          op4: new FormControl(),
          answer: new FormControl()
        })
      ])
    });
  }

  get questionForm(): FormArray {
    return this.questions.get('question') as FormArray;
  }

  addQuestion(i) {
    this.questionForm.push(
      new FormGroup({
        id: new FormControl(i+2),
        quest: new FormControl(),
        op1: new FormControl(),
        op2: new FormControl(),
        op3: new FormControl(),
        op4: new FormControl(),
        answer: new FormControl()
      })
    );
  }

  deleteQuestion(i) {
    this.questionForm.removeAt(i);
  }

  submit = async () => {
    let a = '';
    this.quizData = this.questionForm.value;

    for (let i = 0; i < this.quizData.length; i++) {
      if (this.answer[0] === undefined) {
        a = this.quizData[i].id + ',' + this.quizData[i].answer;
        this.answer = [a];
      } else {
        a = this.quizData[i].id + ',' + this.quizData[i].answer;
        this.answer.push(a);

      }
      delete this.quizData[i]['answer'];
    }
  };
  save = async () => {
    try {
      const b = parseInt(this.batch),   
        a = JSON.stringify(this.answer),
        qD = JSON.stringify(this.quizData),
        q=this.quizName,
        id = JSON.parse(sessionStorage.getItem('profId'));
      const createQuiz = await this.quiz.createQuiz(id, b, qD, a, q).send({
        from: this.account,
        gas: 5000000
      });
      if (createQuiz.status) {
        alert('Success');
      }
    }
    catch (error) {
    }
  }
}
