import { HttpClient } from "@angular/common/http";
import { Account } from "./account.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Auth } from "./auth.model";
import { Movie } from "../homepage/movie.model";

@Injectable({ providedIn: "root" })
export class AccountService {
    private token: string = "";
    // isAuthenticated = false
    authStatusListener = new Subject<boolean>();
    isAdmin = new Subject<boolean>();
    username = new Subject<string>();


    constructor(private http: HttpClient) { }
    getToken() {
        return this.token;
    }

    // getAuthenticationStatus() {
    //     return this.isAuthenticated
    // }

    getUserName() {
        return this.username.asObservable()
    }
    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    setAuthStatusListener() {
        this.authStatusListener.next(false);
    }

    getisAdmin() {
        return this.isAdmin.asObservable();
    }

    createAccount(account: Account) {
        this.http.post('http://localhost:3000/register', account)
            .subscribe((responseData) => {
                alert("Account created successfully!")
            })
    }

    addMovie(movie: Movie) {
        this.http.post('http://localhost:3000/movies', movie)
            .subscribe((responseData) => {
                if (responseData == null) {
                    alert("Movie was not added!")
                }
                else
                    alert("Movie was added successfully!")
            })
    }

    login(auth: Auth) {
        this.http.post<{
            tokenFromServer: string, isAdmin: string, username: string
        }>('http://localhost:3000/login', auth)
            .subscribe((response) => {
                this.token = response.tokenFromServer;
                this.authStatusListener.next(true);
                this.username.next(response.username)

                if (response.isAdmin == 'true') {
                    this.isAdmin.next(true)
                    localStorage.setItem("isAdmin", "true")
                }
                else {
                    this.isAdmin.next(false)
                    localStorage.setItem("isAdmin", "false")
                }
                localStorage.setItem("isAuthenticated", "true")
                localStorage.setItem("username", response.username)
            })
    }
} 
