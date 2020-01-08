import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Web3Model } from 'src/app/Models/web3.model'
import { Web3Service } from 'src/app/Services/Web3/web3.service'

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  private web3var: Web3Model;
  constructor(private web3Service: Web3Service, private route: Router) {}

  async canActivate(): Promise<boolean> {
    if (typeof this.web3Service.AccountSubscription !== 'undefined') {
      if (this.web3Service.AccountSubscription.closed) {
        localStorage.setItem('isLogged', 'false')
        await this.web3Service.web3login()
      }
    } else {
      localStorage.setItem('isLogged', 'false')
      await this.web3Service.web3login()
    }
    this.web3var = await this.web3Service.Web3Details$.value
    const checkStudent = await this.web3var.quiz
      .checkStudent()
      .call({ from: this.web3var.account })
    if (checkStudent > 0) {
      const student = await this.web3var.quiz.Students(checkStudent).call({from: this.web3var.account})
      sessionStorage.setItem('studId', checkStudent);
      sessionStorage.setItem('Name', student.name);
      sessionStorage.setItem('Batch', student.batch);
      sessionStorage.setItem('PhNo', student.phno);
      sessionStorage.setItem('Email', student.email);
      sessionStorage.setItem('Address', student.addr);
      return true;
    } else {
      alert('Sorry ! Only Student can Login');
      this.route.navigateByUrl('/');
    }
  }

  // async canActivate(): Promise<boolean> {
  //   if (typeof this.web3Service.AccountSubscription !== 'undefined') {
  //     if (this.web3Service.AccountSubscription.closed) {
  //       localStorage.setItem('isLogged', 'false');
  //       await this.web3Service.web3login();
  //     }
  //   } else {
  //     localStorage.setItem('isLogged', 'false');
  //     await this.web3Service.web3login();
  //   }
  //   this.web3var = await this.web3Service.Web3Details$.value;
  //   const idStud = await this.web3var.quiz.idStud().call({ from: this.web3var.account });
  //   if(idStud!=0){
  //     let flag = false;
  //     for (let i = 1; i <= idStud; i++) {
  //       let student = await this.web3var.quiz.Students(i).call({ from: this.web3var.account });
  //       console.log('TCL: LoginComponent -> assign -> student', student);
  //       if (student.addr === this.web3var.account) {
  //         sessionStorage.setItem('studId', JSON.stringify(i));
  //         sessionStorage.setItem('Name', student.name);
  //         sessionStorage.setItem('Batch', student.batch);
  //         sessionStorage.setItem('PhNo', student.phno);
  //         sessionStorage.setItem('Email', student.email);
  //         sessionStorage.setItem('Address', student.addr);
  //         flag = true;
  //         return true;
  //       } 
  //     }
  //     if(flag === false) {
  //       alert('Sorry ! Only Student can Login');
  //       this.route.navigateByUrl('/');
  //     }
  //   } else {
  //     alert('Sorry ! Only Student can Login');
  //     this.route.navigateByUrl('/');
  //   }
  // }
}
