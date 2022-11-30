import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieTitle = "Marcel the Shell With Shoes On";
  rating = 4.5;
  reviews = ["Great movie! Can't believe I cried about 10 times.", "Definitly going to watch this again!"];
  casts: any = [
    {
      "name": "Jenny Slate",
      "picture_path": "assets/images/jenny-slate.jpg",
      "role" : "Marcel"
    },
    {
      "name": "Dean Fleischer-Camp",
      "picture_path": "assets/images/dean-fleicher.jpg",
      "role" : "Dean"
    },
    {
      "name": "Nathan Fielder",
      "picture_path": "assets/images/nathan-fielder.jpg",
      "role" : "Justin"
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
