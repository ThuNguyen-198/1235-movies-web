import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@ Component({
    selector: 'app-add-movie',
    templateUrl: './add-movie.component.html',
    styleUrls: ['./add-movie.component.css']
})

export class AddMovieComponent implements OnInit {
    userRole = 'admin';
    showtimes = new FormGroup({
        showtimeList: new FormControl(),
        theater: new FormControl('')
    });
    inputTheater: any;
    inputShowtimes: any = [];

    constructor(
        ) {}
      
    ngOnInit(): void {
    }
    
    onAddTheater(){
    
        if(this.showtimes.controls['showtimeList'].value !== this.inputShowtimes[this.inputShowtimes.length-1]){
            this.inputShowtimes.push(this.showtimes.controls['showtimeList'].value);
        }

        this.showtimes.controls['showtimeList'].reset();
        this.showtimes.controls['theater'].reset();
        this.inputShowtimes = [];
        this.inputTheater = '';
    }

    onAddShowtime(){
        this.inputTheater = this.showtimes.controls['theater'].value;
        if(this.showtimes.controls['showtimeList'].value !== this.inputShowtimes[this.inputShowtimes.length-1]){
            this.inputShowtimes.push(this.showtimes.controls['showtimeList'].value);
        }
        this.showtimes.controls['showtimeList'].reset();
    }

}