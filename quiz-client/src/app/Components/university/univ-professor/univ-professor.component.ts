import { Component, OnInit, DoCheck, Input } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { ProfessorModel } from 'src/app/Models/professor.model'
import { NgForm } from '@angular/forms'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'

@Component({
  selector: 'app-univ-professor',
  templateUrl: './univ-professor.component.html',
  styleUrls: ['./univ-professor.component.scss']
})
export class UnivProfessorComponent implements OnInit {
  prof: ProfessorModel[];
  account: any;
  quiz: any;
  constructor(
    private web3service: Web3Service,
    private breakpointObserver: BreakpointObserver,
    private route: Router
  ) {}

  ngOnInit() {
    this.web3service.Web3Details$.subscribe(async (data: Web3Model) => {
      this.account = data.account;
      this.quiz = data.quiz;
      await this.assign();
    });
  }

  assign = async () => {
    const profs: ProfessorModel[] = [];
    const profId = await this.quiz.idProf().call({ from: this.account });
    for (let i = 1; i <= profId; i++) {
      const Professors = await this.quiz
        .Professors(i)
        .call({ from: this.account });
      if (Professors.profId > 0) {
        profs.push({
          profId: Professors.profId,
          name: Professors.name,
          department: Professors.department,
          phno: Professors.phno,
          email: Professors.email,
          publicKey: Professors.addr
        });
      }
    }
    this.prof = profs;
  };

  onSubmit = async (form: NgForm) => {
    try {
      const profs: ProfessorModel[] = [];
      const Professor: ProfessorModel = form.value;
      let flag = 0;
      const profId = await this.quiz.idProf().call({ from: this.account });
      for (let i = 1; i <= profId; i++) {
        const Professors = await this.quiz
          .Professors(i)
          .call({ from: this.account });
        if (Professors.addr === Professor.publicKey) {
          alert('This Address Already exists');
          flag = 1;
          await this.assign();
          break;
        }
      }

      this.prof = profs;
      if (flag === 0) {
        const setProfessor = await this.quiz
          .addProfessor(
            Professor.name,
            Professor.department,
            Professor.phno,
            Professor.email,
            Professor.publicKey
          )
          .send({
            from: this.account,
            gas: 5000000
          });
        if (setProfessor.status) {
          alert('Success');
          form.resetForm();
        }

        await this.assign();
      }
    } catch (err) {
      alert('Failed!! TryAgain');
      this.route.navigateByUrl('/');
    }
  };

  remove = async profId => {
    try {
      const deleteFile = await this.quiz.deleteProf(profId).send({
        from: this.account,
        gas: 5000000
      });
      this.assign();
    } catch (error) {
    }
  };
  logOut = async () => {
    this.web3service.web3logout();
    this.route.navigateByUrl('/');
  };
}
