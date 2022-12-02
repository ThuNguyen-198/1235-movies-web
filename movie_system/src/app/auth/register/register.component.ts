import { Component, OnInit } from '@angular/core';
import { Account } from '../account.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerTitle = "REGISTER";
  regUsername = "";
  regEmail = "";
  regFirst = "";
  regLast = "";
  address = "";
  phoneNumber = "";
  regPassword = "";

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  onRegister() {
    const account: Account = {
      regUsername: this.regUsername,
      regEmail: this.regEmail,
      regFirst: this.regFirst,
      regLast: this.regLast,
      address: this.address,
      phoneNumber: this.phoneNumber,
      regPassword: this.regPassword
    }
    this.accountService.createAccount(account);
  }

}
