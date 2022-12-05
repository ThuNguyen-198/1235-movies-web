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

    addMovie() {
        const movie: Movie = {
            "id": "1",
            "adult": false,
            "backdrop_path": "/xMpyAxQSJFrvy4tCmH4uR4LErlj.jpg",
            "genre_ids": '18',
            "original_language": "zh",
            "original_title": "夏日天空的那匹紅馬",
            "overview": "Since his wife Mei-yun was left comatose after nearly drowning, CHEN You-ming has been raising his three sons alone in their seaside village. And since the mechanical digger he drives broke down, Chen has had more time on his hands than he likes. His life is suddenly disrupted by the appearance of a disturbed young woman who calls herself XIE Hui-zhen (“Zhen” for short) and says that Chen is her father. To uncover the facts behind Zhen’s wild claim, CHEN has to contact his old girlfriend KE Li-jia, last seen twenty years ago. Before the truth about Zhen’s inner turmoil emerges, CHEN has to deal with the death of his wife in hospital and the stresses in his relationships with his sons Wei, Ting and Liang.",
            "popularity": 1.775,
            "poster_path": "/i6XSIEl1AJQux0eFCFRyw6JQoGZ.jpg",
            "release_date": "2022-12-23",
            "title": "Flotsam and Jetsam",
            "video": false,
            "vote_average": 0,
            "vote_count": 0,
            'show_times': ['9:30', '8:30'],
            'theaters': ['Lubbock', 'Amarilo'],
            'ticket_price': 15,
            'tickets_sold': 299
        }
        this.http.post('http://localhost:3000/movies', movie)
            .subscribe((responseData) => {
                alert("Movie created successfully!")
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
