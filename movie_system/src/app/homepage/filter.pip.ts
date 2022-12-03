import { Pipe, PipeTransform } from "@angular/core";
import { Movie } from "./movie.model";
import { MovieService } from "./movie.service";
@Pipe({ name: 'moviesFilter' })
export class FilterPipe implements PipeTransform {
    constructor(public movieService: MovieService) { }
    transform(items: Movie[], searchText: string, originalItems: Movie[]): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            this.movieService.getMoviesUpdated();
        }
        searchText = searchText.toLowerCase();

        return items.filter(it => {
            return it.title.toLowerCase().includes(searchText);
        })
    }

    getCurrentMovies(items: Movie[], date: Date): any[] {

        return items.filter(it => {
            const release_date = new Date(it.release_date)
            return release_date == date || release_date < date;
        })
    }

    getUpComingMovies(items: Movie[], date: Date): any[] {

        return items.filter(it => {
            const release_date = new Date(it.release_date)
            return release_date > date;
        })
    }
}