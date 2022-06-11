import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  userInput;
  passInput;

  constructor(private route:Router, public navController:NavController, private accountService: AccountService, private alertController: AlertController) { }

  nextPage() {
    if(this.accountService.login(this.userInput, this.passInput)){
      this.route.navigate([`/home/${this.userInput}`])
    }
  }

  nextPageRegister() {
    this.route.navigate([`/register`])
  }

}
