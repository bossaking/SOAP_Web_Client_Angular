import {Injectable} from '@angular/core';
import {Client, ISoapMethodResponse, NgxSoapService} from "ngx-soap";
import {NgxSpinnerService} from "ngx-spinner";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor() {
  }


  setUser(){
    localStorage.setItem("loggedIn", "true");
  }

  isLoggedIn() : boolean{
    return localStorage.getItem("loggedIn") !== null;
  }

  logout(){
    localStorage.removeItem("loggedIn");
  }
}
