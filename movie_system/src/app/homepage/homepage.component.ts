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

  // private moviePassedToDetailPage = new Subject<Movie>();

  constructor(public movieService: MovieService, public moviesFilter: FilterPipe) { }

  ngOnInit(): void {
    this.movieService.getMoviesUpdated().subscribe((movies: Movie[]) => {
      this.moviesList = movies;

    });
  }

  getSearchText(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value;
    this.moviesList = this.moviesFilter.transform([...this.moviesList], this.searchText, this.moviesList);
  }

  // getMoviePassedToDetailPage() {
  //   return this.moviePassedToDetailPage.asObservable();
  // }
}
