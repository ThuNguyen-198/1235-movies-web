import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MovieService } from '../homepage/movie.service';
import { Movie } from '../homepage/movie.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.css']
})
export class TicketBookingComponent implements OnInit {

  theaters = ["Lubbock Premiere", "Cinemark Movies 16", "Alamo Drafthouse Lubbock", "Stars and Stripes"];
  showtimes = [["4:00 PM", "5:30 PM", "7:35 PM", "10:30 PM"], ["6:45 PM", "7:45 PM", "9:30 PM", "10:20 PM"], ["7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"], ["6:30 PM", "7:30 PM", "8:30 PM", "9:30 PM"]];
  selection = "";
  tickets = 0;
  total: number = 0;
  subTotal: number = 0
  shipping: number = 0;
  movieToBook!: Movie
  movieTitle = ""

  constructor(public movieService: MovieService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.movieTitle = paramMap.get('movieTitle')!;
      this.movieService.getMoviesUpdated().subscribe((movies) => {
        for (let i = 0; i < movies.length; i++) {
          if (movies[i].original_title == this.movieTitle) {
            this.movieToBook = movies[i]
          }
        }
      })
    })
  }

  onSubmit(): void {

    console.log("SUBMITTED: " + this.selection);
  }

  onItemChange(e: Event): void {
    this.selection = this.movieToBook.title + ' - ' + (e.target as HTMLInputElement).value;
  }

  onAddTickets() {
    this.tickets += 1;
    this.subTotal = this.tickets * this.movieToBook.ticket_price
    this.shipping = this.tickets * this.movieToBook.ticket_price * 0.08;
    this.total = this.shipping + this.tickets * this.movieToBook.ticket_price;
  }

  onSubtractTickets() {
    this.tickets -= 1;
    this.subTotal = this.tickets * this.movieToBook.ticket_price
    this.shipping = this.tickets * 11.25 * 0.02;
    this.total = this.shipping + this.tickets * 11.25;
  }


}
