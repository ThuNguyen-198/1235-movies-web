import { HttpClient } from "@angular/common/http";
import { Movie } from "./movie.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({ providedIn: "root" })
export class MovieService {
    private movies: Movie[] = [];
    private moviesUpdated = new Subject<Movie[]>();
    constructor(private http: HttpClient) { }
    detailMovie = new Subject<Movie>();
    movieTitle = ""


    getMoviesUpdated() {
        this.http.get<{ message: String, posts: Movie[] }>('http://localhost:3000/movies')
            .subscribe((moviesData) => {
                this.movies = moviesData.posts;
                this.moviesUpdated.next([...this.movies]);
            });
        return this.moviesUpdated.asObservable();
    }

    getMovie(original_title: string) {
        return { ...this.movies.find(movie => movie.original_title === original_title) }
    }

    setMovieTitle(title: string) {
        this.movieTitle = title;
    }
} 
