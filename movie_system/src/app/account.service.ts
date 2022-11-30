import { HttpClient } from "@angular/common/http";
import { Account } from "./account.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({ providedIn: "root" })
export class AccountService {

    private accounts: Account[] = [];
    private accountsUpdated = new Subject<Account[]>();
    constructor(private http: HttpClient) { }

    getAccounts() {
        this.http.get<{ message: string, jobs: Account[] }>('http://localhost:3000/accounts')
            .subscribe((AccountsData) => {
                this.accounts = AccountsData.jobs;
                this.accountsUpdated.next([...this.accounts]);
            })
    }

    getAccountUpdateListener() {
        return this.accountsUpdated.asObservable();
    }

    addAccount(account: Account) {
        this.http.post<{ message: string }>('http://localhost:3000/accounts', account)
            .subscribe((responseData) => {
                console.log(responseData);
                this.accounts.push(account);
                this.accountsUpdated.next([...this.accounts]);
            })


    }

} 
