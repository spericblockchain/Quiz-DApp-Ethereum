import { Component, OnInit, DoCheck, Input } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { ProfessorModel } from "src/app/Models/professor.model";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { question } from "src/app/Models/question.model";

import { Router } from "@angular/router";
import { Web3Service } from "src/app/Services/Web3/web3.service";
import { Web3Model } from "src/app/Models/web3.model";

@Component({
  selector: "app-quiz-list",
  templateUrl: "./quiz-list.component.html",
  styleUrls: ["./quiz-list.component.scss"]
})
export class QuizListComponent implements OnInit {
  ques = [];
  q = [];
  stud = [];
  modalQues: {};
  showModalBox: boolean = false;
  showReportBox: boolean = false;
  account: any;
  quiz: any;
  quizName: any;
  batch: any;
  constructor(
    private web3service: Web3Service,
    private breakpointObserver: BreakpointObserver,
    private route: Router
  ) {}

  ngOnInit() {
    this.web3service.Web3Details$.subscribe(async (data: Web3Model) => {
      this.account = data.account;
      this.quiz = data.quiz;
    });
    this.assign();
  }

  assign = async () => {
    try {
      const quest = [];
      const quizId = await this.quiz.idQuiz().call({ from: this.account });
      const profId = JSON.parse(sessionStorage.getItem("profId"));
      console.log("TCL: QuizListComponent -> assign -> profId", profId);
      for (let i = 1; i <= quizId; i++) {
        console.log("TCL: QuizListComponent -> assign -> i", i)
        const assignedProf = await this.quiz
          .assignedProf(i)
          .call({ from: this.account });
        console.log(
          "TCL: QuizListComponent -> assign -> assignedProf",
          assignedProf
        );
        if (assignedProf === profId) {
          console.log("INSIDE ASSIGNED PROF");          
          console.log("TCL: QuizListComponent -> assign -> this.account", this.account)
          let ques = await this.quiz
            .getQuiz( profId, i )
            .call({ from: this.account });
          console.log("TCL: QuizListComponent -> assign -> ques", ques)
          let ans = await this.quiz
            .getAnswers(i, profId)
            .call({ from: this.account });
          console.log("TCL: QuizListComponent -> assign -> ans", ans)
          if (ques.quiz != "") {
            console.log("INSIDE QUES.QUIZ");
            const quizName = await this.quiz
              .QuizName(i)
              .call({ from: this.account });
            const batch = await this.quiz
              .QuizBatch(i)
              .call({ from: this.account });
            this.q = JSON.parse(ques.quiz);
            let a = JSON.parse(ans);
            for (let i = 0; i < this.q.length; i++) {
              let as = a[i].split(",");
              this.q[i]["ans"] = as[1];
            }
            quest.push({
              id: i,
              quizName: quizName,
              batch: batch,
              quiz: this.q
            });
          } else {
            continue;
          }
        }
      }
      this.ques = quest;
      console.log("TCL: QuizListComponent -> assign -> quest", quest);
    } catch (error) {
      console.log("TCL: QuizListComponent -> assign -> error", error);
    }
  };

  modal = async i => {
    try {
      this.modalQues = await this.ques[i].quiz;
      this.showModalBox = true;
    } catch (error) {
      console.log("TCL: QuizListComponent -> error", error);
    }
  };

  report = async index => {
    try {
      let stude = [];
      const batch = await this.ques[index].batch;
      const id = await this.ques[index].id;
      const idStud = await this.quiz.idStud().call({ from: this.account });
      for (let i = 1; i <= idStud; i++) {
        let stud = await this.quiz.Students(i).call({ from: this.account });
        const submit = await this.quiz
          .getSubmit(i, id)
          .call({ from: this.account });
        if (stud.batch === batch && submit === "1") {
          let score = await this.quiz
            .getScore(i, id)
            .call({ from: this.account });
          stude.push({
            id: i,
            name: stud.name,
            score: score
          });
        }
      }
      this.stud = stude;
      this.showReportBox = true;
    } catch (error) {
      console.log("TCL: QuizListComponent -> error", error);
    }
  };
  remove = async quizId => {
    try {
      const profId = sessionStorage.getItem("profId");
      const deleteFile = await this.quiz.deleteQuiz(profId, quizId).send({
        from: this.account,
        gas: 5000000
      });
      this.assign();
    } catch (error) {
      console.log(error);
    }
  };

  logOut = async () => {
    this.web3service.web3logout();
    this.route.navigateByUrl("/");
  };
}
