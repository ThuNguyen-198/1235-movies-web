import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../auth/account.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit, OnDestroy {
  username = 'smmr.rrr';
  userIsAuthenticated = false;
  private authListenerSubs: Subscription = Subscription.EMPTY;

  constructor(public accountService: AccountService) {
  }

  ngOnInit(): void {
    this.authListenerSubs = this.accountService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      })
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
