import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Account } from "../account.model";
import { AccountService } from "../account.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    email = new FormControl('', [Validators.required, Validators.email]);
    accounts: Account[] = [];
    loginTitle = 'LOGIN';
    username = '';
    password = '';

    constructor(public accountService: AccountService) { }
    ngOnInit() { }

    onLogin() {
        this.accountService.getAccounts;
        this.accountService.getAccountUpdateListener()
            .subscribe((accountsReturned: Account[]) => {
                this.accounts = accountsReturned;
            })
    }
}