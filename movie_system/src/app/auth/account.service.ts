import { HttpClient } from "@angular/common/http";
import { Account } from "./account.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Auth } from "./auth.model";
@Injectable({ providedIn: "root" })
export class AccountService {
    private token: string = "";
    constructor(private http: HttpClient) { }
    getToken() {
        return this.token;
    }
    createAccount(account: Account) {
        this.http.post('http://localhost:3000/register', account)
            .subscribe((responseData) => {
                console.log(responseData);
            })
    }

    login(auth: Auth) {
        this.http.post<{ tokenFromServer: string }>('http://localhost:3000/login', auth)
            .subscribe((response) => {
                this.token = response.tokenFromServer;
                console.log(response)
            })
        alert("login successfully")
    }

} 
