/** @format */

import { Component, OnInit, DoCheck, Input } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  @Input()
  ContentType: number;
  name: any;

  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.XSmall)
  .pipe(map(result => result.matches));

constructor(
  private web3service: Web3Service,
  private breakpointObserver: BreakpointObserver,
  private route: Router
) {}

ngOnInit() {
  this.name = sessionStorage.getItem('Name');
}

logOut = async () => {
  sessionStorage.clear();
  this.web3service.web3logout();
  this.route.navigateByUrl('/');
}

}
