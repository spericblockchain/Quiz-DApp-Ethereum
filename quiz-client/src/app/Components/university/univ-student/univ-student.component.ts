import { Component, OnInit, DoCheck, Input } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { ProfessorModel } from 'src/app/Models/professor.model'
import { NgForm } from '@angular/forms'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'
import { StudentModel } from 'src/app/Models/student.model'

@Component({
  selector: 'app-univ-student',
  templateUrl: './univ-student.component.html',
  styleUrls: ['./univ-student.component.scss']
})
export class UnivStudentComponent implements OnInit {
  students: StudentModel[];
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
    const studs: StudentModel[] = [];
    const studId = await this.quiz.idStud().call({ from: this.account });
    for (let i = 1; i <= studId; i++) {
      const Students = await this.quiz.Students(i).call({ from: this.account });
      if (Students.studId > 0) {
        studs.push({
          studId: Students.studId,
          name: Students.name,
          batch: Students.batch,
          phno: Students.phno,
          email: Students.email,
          publicKey: Students.addr
        });
      }
    }
    this.students = studs;
  };

  onSubmit = async (form: NgForm) => {
    try {
      const studs: StudentModel[] = [];
      const Student: StudentModel = form.value;
      let flag = 0;
      const studId = await this.quiz.idStud().call({ from: this.account });
      for (let i = 1; i <= studId; i++) {
        const Students = await this.quiz
          .Students(i)
          .call({ from: this.account });
        if (Students.addr === Student.publicKey) {
          alert('This Address Already exists');
          flag = 1;
          await this.assign();
          break;
        }
      }
      this.students = studs;
      if (flag === 0) {
        const setStudents = await this.quiz
          .addStudent(
            Student.name,
            Student.batch,
            Student.phno,
            Student.email,
            Student.publicKey
          )
          .send({
            from: this.account,
            gas: 5000000
          });
        if (setStudents.status) {
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

  remove = async studId => {
    try {
      const deleteFile = await this.quiz.deleteStud(studId).send({
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
