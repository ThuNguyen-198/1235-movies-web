import { Component, OnInit } from '@angular/core';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { FilterPipe } from './filter.pip';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  userRole = 'admin';
  searchText = "";
  moviesList: Movie[] = [];
  filteredMovies: Movie[] = [];

  constructor(public movieService: MovieService, public moviesFilter: FilterPipe) { }

  ngOnInit(): void {
    this.movieService.getMoviesUpdated().subscribe((movies: Movie[]) => {
      this.moviesList = movies;
      this.filteredMovies = movies

    });
  }

  getSearchText(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value;
    this.filteredMovies = this.moviesFilter.transform([...this.moviesList], this.searchText);
  }

  getCurrent() {
    let date = new Date()
    this.filteredMovies = this.moviesFilter.getCurrentMovies([...this.moviesList], date);
  }


  getUpcoming() {
    console.log('call getUpcoming')
    let date = new Date()
    this.filteredMovies = this.moviesFilter.getUpComingMovies([...this.moviesList], date);
  }
  getAll() {
    this.filteredMovies = this.moviesList
  }

  onViewDetails() {

  }

}
