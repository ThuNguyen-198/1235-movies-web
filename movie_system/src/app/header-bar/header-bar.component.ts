import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../auth/account.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  username = 'smmr.rrr';
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;

  constructor(public accountService: AccountService) {
  }

  ngOnInit(): void {
    this.authListenerSubs = this.accountService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      })

    if (localStorage.getItem("isAuthenticated") == "true") {
      this.userIsAuthenticated = true
    }
    else {
      this.userIsAuthenticated = false
    }

  }

  onLogout() {
    this.accountService.setAuthStatusListener()
    localStorage.clear()
  }

  // ngOnDestroy(): void {
  //   this.authListenerSubs.unsubscribe();
  // }
}
