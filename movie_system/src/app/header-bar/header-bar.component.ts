import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../auth/account.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  username = '';
  userIsAuthenticated = false;
  isAdmin = false;

  constructor(public accountService: AccountService) {
  }

  ngOnInit(): void {
    // ---------Setup User Authentication Status---------
    this.accountService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      })

    if (localStorage.getItem("isAuthenticated") == "true") {
      this.userIsAuthenticated = true
    }
    else {
      this.userIsAuthenticated = false
    }

    this.accountService.getisAdmin()
      .subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      })

    if (localStorage.getItem("isAdmin") == "true") {
      this.isAdmin = true
    }
    else {
      this.isAdmin = false
    }
    // ---------Setup User Authentication Status---------

    // ---------Setup isAdmin---------
    // this.accountService.getAuthStatusListener()
    //   .subscribe(isAuthenticated => {
    //     this.userIsAuthenticated = isAuthenticated;
    //   })

    // if (localStorage.getItem("isAuthenticated") == "true") {
    //   this.userIsAuthenticated = true
    // }
    // else {
    //   this.userIsAuthenticated = false
    // }
    // ---------Setup isAdmin--------

    // ---------Setup User Name---------
    this.accountService.getUserName()
      .subscribe(username => {
        this.username = username;
      })

    this.username = localStorage.getItem("userName")!
  }
  // ---------Setup User Name---------

  onLogout() {
    this.accountService.setAuthStatusListener()
    localStorage.clear()
  }

}
