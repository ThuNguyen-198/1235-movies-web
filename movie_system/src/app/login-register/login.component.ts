import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    email = new FormControl('', [Validators.required, Validators.email]);
    loginTitle = 'Login';
    username = '';
}