import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  userInput;
  passInput;
  rePassInput;

  constructor(private route:Router, public navController:NavController, private accountService: AccountService, private alertController: AlertController) { }

  async addAccount(){
    const alert = await this.alertController.create({
      message: 'Tài khoản đã tồn tại',
      buttons: ['OK']
    });

    if (this.rePassInput === this.passInput) {
      if(this.accountService.addUser(this.userInput, this.passInput)){
        alert.message = 'Tạo thành công!';
      }
    } else {
      alert.message = 'Tạo thất bại'!;
    }
    await alert.present();
  }

  async showAccounts(){
    const users = this.accountService.getAllUser();
    const alert = await this.alertController.create({
      header: 'Danh sách tài khoản',
      message: (u => {
        let s = '';
        u.forEach((e, i) => {
          s += `${i + 1} - ${e.email} <br/>`;
        });
        return s;
      })(users),
      buttons: ['OK']
    });
    await alert.present();
  }

  backPageLogin() {
    this.route.navigate([`/login`])
  }

}
