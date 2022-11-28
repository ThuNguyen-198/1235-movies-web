import { Component, OnInit } from '@angular/core';
import { Account } from '../account.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  accountName = "";
  email = "";
  address = "";
  phone = "";
  password = "";

  constructor(public accountsService: AccountService) { }

  ngOnInit(): void {
  }

  onAddAccount() {
    alert("account added!")
    const account: Account = {
      accountName: this.accountName,
      email: this.email,
      address: this.address,
      phone: this.phone,
      password: this.password
    }

    this.accountsService.addAccount(account);
  }
}
