import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from 'src/app/servies/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  inputUsername: string ;
  inputPass: string;
  failLogin = false;
  constructor(private loginService: LoginService, private appRoutes: Router) { }
  ngOnInit() {
    if (this.loginService.login()){
      this.appRoutes.navigateByUrl('/home');
    }
  }
  handleClick(event){
    this.failLogin = !this.loginService.login(this.inputUsername,this.inputPass);
    if(!this.failLogin){
      this.appRoutes.navigateByUrl('/home');
    }
  }
}
