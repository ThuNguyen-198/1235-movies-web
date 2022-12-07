import { Component, OnInit } from '@angular/core';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { FilterPipe } from './filter.pip';
import { Subject } from 'rxjs';
import { AccountService } from '../auth/account.service';

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
  isAdmin = false
  movieId = '';
  id = ""
  userIsAuthenticated = false;
  // movieDeleted = true

  constructor(public movieService: MovieService, public moviesFilter: FilterPipe, public accountService: AccountService) { }

  ngOnInit(): void {
    this.movieService.getMoviesUpdated().subscribe((movies: Movie[]) => {
      console.log("movies: " + movies)
      this.moviesList = movies;
      this.filteredMovies = movies
    });
    this.accountService.getisAdmin()
      .subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      })

    if (localStorage.getItem("isAdmin") == "true") {
      this.isAdmin = true
    }
    else {
      this.isAdmin = false
    }
    this.accountService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      })

    if (localStorage.getItem("isAuthenticated") == "true") {
      this.userIsAuthenticated = true
    }
    else {
      this.userIsAuthenticated = false
    }
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
    let date = new Date()
    this.filteredMovies = this.moviesFilter.getUpComingMovies([...this.moviesList], date);
  }

  isUpcomming(releaseDate: string){
    return new Date(releaseDate) > new Date()
  }
  getAll() {
    this.filteredMovies = this.moviesList
  }

  onDeleteMovie() {
    this.movieService.deleteMovie(this.movieId);
  }

  onClick(id:string){
    this.movieId = id;
  }

}
