/**@format */

import { Component, OnInit, DoCheck, Input } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {
  @Input()
  ContentType: number

  constructor(
    private web3service: Web3Service,
    private breakpointObserver: BreakpointObserver,
    private route: Router
  ) {}

  ngOnInit() {
  }

  logOut = async () => {
    this.web3service.web3logout()
    this.route.navigateByUrl('/')
  }

}
