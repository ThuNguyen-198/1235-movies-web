import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  username = 'smmr.rrr';
  userRole = 'admin';
  movies: any = [
    {
      "adult": false,
      "backdrop_path": "assets/images/marcel.jpg",
      "genre_ids": [],
      "original_language": "en",
      "original_title": "Marcel the Shell with Shoes On",
      "overview": "Marcel is an adorable one-inch-tall shell who ekes out a colorful existence with his grandmother Connie and their pet lint, Alan. Once part of a sprawling community of shells, they now live alone as the sole survivors of a mysterious tragedy. But when a documentary filmmaker discovers them amongst the clutter of his Airbnb, the short film he posts online brings Marcel millions of passionate fans, as well as unprecedented dangers and a new hope at finding his long-lost family. A beloved character gets his big-screen debut in this hilarious and heartwarming story about finding connection in the smallest corners.",
      "popularity": 5,
      "poster_path": "assets/images/marcel.jpg",
      "release_date": "2022-05-01",
      "title": "Marcel the Shell with Shoes On",
      "video": false,
      "vote_average": 4.4,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/mz0HRRA5kiz0rGVtBKAUVGMYBou.jpg",
      "genre_ids": [],
      "original_language": "en",
      "original_title": "Smyrna",
      "overview": "A century after the disaster of Smyrna comes to life the critically acclaimed and moving drama about an elderly Greek American woman whose family diary recounts the 1922 burning of the cosmopolitan city of Smyrna where Greeks, Turks, Jews, Armenians, and Levantines once lived together harmoniously.",
      "popularity": 3.502,
      "poster_path": "/wMNtjz063B2WjV3kuVhniGzdMcF.jpg",
      "release_date": "2022-12-08",
      "title": "Smyrna",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    }
];

  constructor() { }

  ngOnInit(): void {
  }

}
