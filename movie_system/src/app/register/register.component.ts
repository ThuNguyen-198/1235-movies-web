import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: any;
  registerTitle = "REGISTER";
  regUsername = "";
  regFirst = "";
  regLast = "";
  address = "";
  phoneNumber = "";
  regPassword = "";
  
  constructor() { }

  ngOnInit(): void {
  }

  onRegister(){
    if(this.regUsername === ''){
      console.log("Username required!");
    }
  }

}
