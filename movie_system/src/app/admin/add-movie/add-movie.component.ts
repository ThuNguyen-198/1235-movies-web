import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AccountService } from "src/app/auth/account.service";
import { FilterPipe } from "src/app/homepage/filter.pip";
import { Movie } from "src/app/homepage/movie.model";
import { MovieService } from "src/app/homepage/movie.service";

@Component({
    selector: 'app-add-movie',
    templateUrl: './add-movie.component.html',
    styleUrls: ['./add-movie.component.css']
})

export class AddMovieComponent implements OnInit {
    moviesList: Movie[] = [];
    movieTitle = ""
    movieToAdd!: Movie
    showtimes = new FormGroup({
        showtimeList: new FormControl(),
        theater: new FormControl('')
    });
    inputTheater: any = [];
    inputShowtimes: any = [];

    constructor(public movieService: MovieService, public moviesFilter: FilterPipe, public accountService: AccountService) { }

    ngOnInit(): void {
        this.movieService.getMoviesFromApi().subscribe((movies) => {
            console.log(movies)
            this.moviesList = movies
        })
    }
    // ------------------------------------

    onPickMovie(movie: Movie) {
        this.movieTitle = movie.original_title
        this.movieToAdd = movie
    }

    onAddTheater() {

        if (this.showtimes.controls['showtimeList'].value !== this.inputShowtimes[this.inputShowtimes.length - 1]) {
            this.inputShowtimes.push(this.showtimes.controls['showtimeList'].value);
        }

        this.showtimes.controls['showtimeList'].reset();
        this.showtimes.controls['theater'].reset();
        this.inputShowtimes = [];
        this.inputTheater = '';
    }

    onAddShowtime() {
        this.inputTheater = this.showtimes.controls['theater'].value;
        if (this.showtimes.controls['showtimeList'].value !== this.inputShowtimes[this.inputShowtimes.length - 1]) {
            this.inputShowtimes.push(this.showtimes.controls['showtimeList'].value);
        }
        this.showtimes.controls['showtimeList'].reset();
    }

    onAddMovie() {
        this.accountService.addMovie(this.movieToAdd)
    }

}