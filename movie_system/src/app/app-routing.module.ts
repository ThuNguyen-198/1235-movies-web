import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderBarComponent } from "./header-bar/header-bar.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { LoginComponent } from "./login/login.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { RegisterComponent } from "./register/register.component";
import { TicketBookingComponent } from "./ticket-booking/ticket-booking.component";

const routes: Routes = [
    { path: 'home', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: MovieDetailsComponent },
    { path: 'booking', component: TicketBookingComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }













