import { HttpClient } from "@angular/common/http";
import { Account } from "./account.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Auth } from "./auth.model";
@Injectable({ providedIn: "root" })
export class AccountService {
    private token: string = "";
    // isAuthenticated = false
    authStatusListener = new Subject<boolean>();


    constructor(private http: HttpClient) { }
    getToken() {
        return this.token;
    }

    // getAuthenticationStatus() {
    //     return this.isAuthenticated
    // }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    setAuthStatusListener() {
        this.authStatusListener.next(false);
    }

    createAccount(account: Account) {
        this.http.post('http://localhost:3000/register', account)
            .subscribe((responseData) => {
                // alert("Account created successfully!")
            })
    }

    login(auth: Auth) {
        this.http.post<{ tokenFromServer: string }>('http://localhost:3000/login', auth)
            .subscribe((response) => {
                this.token = response.tokenFromServer;
                this.authStatusListener.next(true);
                localStorage.setItem("isAuthenticated", "true")
            })
    }

    // logout() {
    //     this.authStatusListener.next(false)
    // }

} 
