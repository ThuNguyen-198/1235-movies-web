import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderBarComponent } from "./header-bar/header-bar.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { LoginComponent } from "./auth/login/login.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { RegisterComponent } from "./auth/register/register.component";
import { TicketBookingComponent } from "./ticket-booking/ticket-booking.component";
import { AddMovieComponent } from "./admin/add-movie/add-movie.component";

const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'movie-details/:movieTitle', component: MovieDetailsComponent },
    { path: 'booking', component: TicketBookingComponent },
    { path: 'add-movie', component: AddMovieComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }













