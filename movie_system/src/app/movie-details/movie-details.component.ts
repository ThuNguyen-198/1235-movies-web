import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  reviews: any = [
    {
      "username": "amy94",
      "review": "Great movie! Thought I would not cry at a family, comedy movie but yes, crying like a baby."
    },
    {
      "username": "smmr.rrr",
      "review": "Would really recommmend! Such a wonderful movie."
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
