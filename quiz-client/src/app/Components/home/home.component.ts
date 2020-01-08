import { Component, OnInit } from '@angular/core'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { BreakpointObserver } from '@angular/cdk/layout'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  constructor(
    private web3service: Web3Service,
    private breakpointObserver: BreakpointObserver,
    private route: Router
  ) {}
  ngOnInit() {
  }

  logInU = async () => {
    this.web3service.web3login()
    this.route.navigateByUrl('/university')
  }
  logInP = async () => {
    this.web3service.web3login()
    this.route.navigateByUrl('/professor')
  }
  logInS = async () => {
    this.web3service.web3login()
    this.route.navigateByUrl('/student')
  }

}
