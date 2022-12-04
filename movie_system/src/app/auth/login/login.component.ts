import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Account } from "../account.model";
import { AccountService } from "../account.service";
import { Auth } from "../auth.model";

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
        const auth: Auth = { regUsername: this.username, regPassword: this.password }
        this.accountService.login(auth);

    }
}