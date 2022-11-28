import { HttpClient } from "@angular/common/http";
import { Account } from "./account.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AccountService {

    private accounts: Account[] = [];
    private accountsUpdated = new Subject<Account[]>();
    constructor(private http: HttpClient) { }

    getAccount() {
        this.http.get<{ message: string, posts: Account[] }>('http://localhost:3000/account')
            .subscribe((accountsData) => {
                this.accounts = accountsData.posts;
                this.accountsUpdated.next([...this.accounts]);
            });
    }

    getAccountUpdateListener() {
        return this.accountsUpdated.asObservable();
    }

    addAccount(
        account: Account) {
        this.http.post<{ message: string }>('http://localhost:3000/account', account)
            .subscribe((responseData) => {
                console.log(responseData.message);
                this.accounts.push(account);
                this.accountsUpdated.next([...this.accounts])
            })


    }
}
