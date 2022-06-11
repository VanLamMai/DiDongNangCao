import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  inputUsername: string;
  inputPass: string;
  constructor(
    public acountService: AccountService,
    private alertCtrl: AlertController,
    private router: Router
    ) {}
  ngOnInit() {
  }
  async handleAdd(){
    const alert =await this.alertCtrl.create({
      header: 'Kết quả',
      message: 'Tài khoản đã tồn tại',
      buttons: ['OK']
    });
    if(this.acountService.addUsr(this.inputUsername, this.inputPass)){
      alert.message = 'Tạo thành công';
    };
    await alert.present();
  }
  async handleDel(){
    const alert =await this.alertCtrl.create({
      header: 'Thông báo',
      message: 'Xóa thành công ' + this.inputUsername,
      buttons: ['OK'],
    });
    if(!this.acountService.deleteUsr(this.inputUsername, this.inputPass)){
      alert.message = 'Xóa thất bại';
    }
    await alert.present();
  }
  async handleAll(){
    const users = this.acountService.getAll();
    const alert = await this.alertCtrl.create({
      header: 'Tất cả tài khoản',
      message: (u => {
        let s = '';
        u.forEach((e, i) => {
          s+= `${i+1} - ${e.id} <br />`;
        });
        return s;
      })(users),
      buttons: ['OK']
    });
    await alert.present();
  }
  handleLogin(event){
    if(this.acountService.loginUser(this.inputUsername, this.inputPass)){
      this.router.navigateByUrl('/home');
    }
  }
}
