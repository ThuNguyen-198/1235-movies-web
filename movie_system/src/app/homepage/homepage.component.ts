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

  constructor(public movieService: MovieService, public moviesFilter: FilterPipe, public accountService: AccountService) { }

  ngOnInit(): void {
    this.movieService.getMoviesUpdated().subscribe((movies: Movie[]) => {
      this.moviesList = movies;
      console.log(this.moviesList[0].id)
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
  getAll() {
    this.filteredMovies = this.moviesList
  }

  onAddMovie() {
    this.accountService.addMovie();
  }

  onDeleteMovie(id: string) {
    console.log("Comp.ts" + id)
    this.movieService.deleteMovie(id)
  }
}
