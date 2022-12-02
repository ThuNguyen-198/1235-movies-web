import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.css']
})
export class TicketBookingComponent implements OnInit {

  theaters = ["Lubbock Premiere", "Cinemark Movies 16", "Alamo Drafthouse Lubbock", "Stars and Stripes"];
  showtimes = [["4:00PM","5:30PM","7:35 PM", "10:30 PM"], ["6:45 PM", "7:45 PM", "9:30 PM", "10:20 PM"], ["7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"], ["6:30 PM", "7:30 PM", "8:30 PM", "9:30 PM"]];
  booked = [];

  constructor(
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {

    console.log("it submitted");
  }

  onItemChange(value: string): void {

    console.log("value of radio button is: " + value);
  }
  
}
