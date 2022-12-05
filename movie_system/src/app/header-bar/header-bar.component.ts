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
    // ---------Setup User Authentication Status---------

    // ---------Setup User Name---------
    this.accountService.getUserName()
      .subscribe(username => {
        this.username = username;
      })

    this.username = localStorage.getItem("userName")!


  }

  onLogout() {
    this.accountService.setAuthStatusListener()
    localStorage.clear()
  }

}
