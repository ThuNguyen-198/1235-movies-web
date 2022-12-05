import { Component, OnInit, OnDestroy } from '@angular/core';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { Subject, Subscription } from 'rxjs';
import { AccountService } from '../auth/account.service';
import { Movie } from '../homepage/movie.model';
import { HomepageComponent } from '../homepage/homepage.component';
import { MovieService } from '../homepage/movie.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authStatusSubs: Subscription = Subscription.EMPTY;
  original_title: string = "";
  moviePassed!: Movie;

  movieTitle = "Marcel the Shell With Shoes On";
  rating = 4.5;
  reviews = ["Great movie! Can't believe I cried about 10 times.", "Definitly going to watch this again!"];
  openReview = false;
  casts: any = [
    {
      "name": "Jenny Slate",
      "picture_path": "assets/images/jenny-slate.jpg",
      "role": "Marcel"
    },
    {
      "name": "Dean Fleischer-Camp",
      "picture_path": "assets/images/dean-fleicher.jpg",
      "role": "Dean"
    },
    {
      "name": "Nathan Fielder",
      "picture_path": "assets/images/nathan-fielder.jpg",
      "role": "Justin"
    }
  ];

  constructor(public accountService: AccountService, public movieService: MovieService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    // Pass data to detail page
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.original_title = paramMap.get('movieTitle')!;
      this.movieService.getMoviesUpdated().subscribe((movies) => {
        for (let i = 0; i < movies.length; i++) {
          if (movies[i].original_title == this.original_title) {
            this.moviePassed = movies[i]
          }
        }
      })
    })

    if (localStorage.getItem("isAuthenticated") == "true") {
      this.userIsAuthenticated = true
    }
    else {
      this.userIsAuthenticated = false
    }
    // this.userIsAuthenticated = this.accountService.getAuthenticationStatus()

    // this.authStatusSubs = this.accountService.getAuthStatusListener().subscribe(
    //   isUserAuthenticated => {
    //     this.userIsAuthenticated = isUserAuthenticated;
    //   });
  }

  onReview() {
    this.openReview = !this.openReview;
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }
}
