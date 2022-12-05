import { HttpClient } from "@angular/common/http";
import { Movie } from "./movie.model";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
@Injectable({ providedIn: "root" })
export class MovieService {
    private movies: Movie[] = [];
    private moviesUpdated = new Subject<Movie[]>();
    constructor(private http: HttpClient) { }
    movieTitle = ""
    movieToBook = new Subject<Movie>()


    getMoviesUpdated() {
        this.http.get<{ message: String, posts: any[] }>('http://localhost:3000/movies')
            .pipe(map((movieData) => {
                return movieData.posts.map(movieOnMap => {
                    return {

                        id: movieOnMap._id,
                        adult: movieOnMap.adult,
                        backdrop_path: movieOnMap.backdrop_path,
                        genre_ids: movieOnMap.genre_ids,
                        original_language: movieOnMap.original_language,
                        original_title: movieOnMap.original_title,
                        overview: movieOnMap.overview,
                        popularity: movieOnMap.popularity,
                        poster_path: movieOnMap.poster_path,
                        release_date: movieOnMap.release_date,
                        title: movieOnMap.title,
                        video: movieOnMap.video,
                        vote_average: movieOnMap.vote_average,
                        vote_count: movieOnMap.vote_count,
                        show_times: movieOnMap.show_times,
                        theaters: movieOnMap.theaters,
                        ticket_price: movieOnMap.ticket_price,
                        tickets_sold: movieOnMap.tickets_sold
                    }
                })
            }))
            .subscribe((movieData) => {
                this.movies = movieData
                this.moviesUpdated.next([...this.movies]);
            });
        return this.moviesUpdated.asObservable();
    }

    setMovieTitle(title: string) {
        this.movieTitle = title;
    }

    deleteMovie(id: string) {
        this.http.post("http://localhost:3000/deleteMovie", id).subscribe(() => {
            const movieListAfterDeleted = this.movies.filter(movie => movie.id !== id)
            this.movies = movieListAfterDeleted
            this.moviesUpdated.next([...movieListAfterDeleted])
        })
    }
} 
