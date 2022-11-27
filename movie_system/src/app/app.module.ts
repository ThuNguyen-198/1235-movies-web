import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { HomepageComponent } from './homepage/homepage.component'

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

const routes: Routes = [
  {path : '', component: HomepageComponent},
  {path : 'login', component: LoginComponent},
  {path : 'register', component: RegisterComponent},
];

import { HttpClientModule } from "@angular/common/http";
import { MoviesComponent } from './movies/movies.component';

import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    RegisterComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot(routes),

    MoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
