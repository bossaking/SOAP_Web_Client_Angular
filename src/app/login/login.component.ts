import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgxSoapService, Client, ISoapMethodResponse} from 'ngx-soap';
import {HttpHeaders} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });


  client: Client | undefined;

  constructor(private router: Router, private userService: UserService, private spinner: NgxSpinnerService, private soap: NgxSoapService) {
    this.soap.createClient('http://localhost:8080/api/login?wsdl').then((client: Client | undefined) => {
      this.client = client;
    });

  }

    ngOnInit():void {}


    login()
    {
      let body = this.loginForm.value;
      this.spinner.show();
      this.client?.setEndpoint("http://localhost:8080/api/login");
      this.client?.clearSoapHeaders();
      this.client?.addSoapHeader({'soap:username' : {value : this.loginForm.controls['username'].value}});
      this.client?.call("logIn", body).subscribe((res: ISoapMethodResponse) => {
        this.spinner.hide();
        if (res.result.return === true) {
          this.userService.setUser();
          this.router.navigate(['']);
        }
      }, error => {
        alert(error.error)
        this.spinner.hide();
      });

    }

  }
