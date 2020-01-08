import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  quiz: any;
  account: any;
  studId: any;
  quizId: any;
  q = [];
  constructor(private web3service: Web3Service, private route: Router) {}

  ngOnInit() {
    this.web3service.Web3Details$.subscribe(async (data: Web3Model) => {
      this.account = data.account;
      this.quiz = data.quiz;
    });
    this.view();
    this.studId = parseInt(sessionStorage.getItem('studId'));
  }

  view = async () => {
    let ques = [];
    const idQuiz = await this.quiz.idQuiz().call({ from: this.account });
    for (let i = 1; i <= idQuiz; i++) {
      let submit = await this.quiz
        .getSubmit(this.studId, i)
        .call({ from: this.account });
      if (submit === '1') {
        let quizName = await this.quiz.QuizName(i).call({ from: this.account });
        let score = await this.quiz
          .getScore(this.studId, i)
          .call({ from: this.account });
        ques.push({
          id: i,
          name: quizName,
          score: score
        });
      }
    }
    this.q = ques;
  };
}
