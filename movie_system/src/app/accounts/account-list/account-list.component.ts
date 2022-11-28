import { Component, OnDestroy, OnInit } from '@angular/core';
import { Account } from '../account.model';
import { AccountService } from '../account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts: Account[] = [];

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccount();
    this.accountService.getAccountUpdateListener()
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      });
  }


}

