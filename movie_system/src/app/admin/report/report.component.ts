import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {
    date = new Date();
    filteredMovies = [{
        "title": "",
        "poster_path": "",
        "original_title": ""
    }];
    constructor() {}
      
    ngOnInit(): void {
    }
}