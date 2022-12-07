import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/homepage/movie.service';
import { Movie } from 'src/app/homepage/movie.model';
import { FilterPipe } from 'src/app/homepage/filter.pip';


@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {
    movieList: Movie[] = []
    date = new Date();
    totalTicketsSold = 0
    filteredMovies = [{
        "title": "",
        "poster_path": "",
        "original_title": ""
    }];
    constructor(public movieService: MovieService, public moviesFilter: FilterPipe) { }

    ngOnInit(): void {
        this.movieService.getMoviesUpdated().subscribe((movies: Movie[]) => {
            this.movieList = movies;
            let date = new Date()
            this.filteredMovies = this.moviesFilter.getCurrentMovies([...this.movieList], date);
        });
        for (let i = 0; i < this.movieList.length; i++) {
            console.log(this.movieList[i])
            this.totalTicketsSold = + this.movieList[i].tickets_sold
        }

    }



}