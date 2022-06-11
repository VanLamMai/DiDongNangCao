import { Component, OnInit, ɵisListLikeIterable } from '@angular/core';
import { NavController } from "@ionic/angular";
import { AccountService } from '../account.service';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailDefault = {
    email: 'yourmail@gmail.com',
    password: '1234',
    amount: '100000' 
  }  

  email: string
  password: string
  showMessage: boolean
  message: string  
  check: boolean

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private accountService: AccountService) {  

  }  

  ngOnInit() {
    this.showMessage = false
    this.email = ''
    this.password = ''
    this.check = false
  }

  async presentAlert(title: string, message: string) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

  clickButton() {    
    if (this.email == '' || this.password == '') {
      this.message = 'Email và password không được để trống!'    
      this.showMessage = true
    }
    else {
      this.checkExistsAccount('full').then(resolve => {
        if (this.check) {
          this.navCtrl.navigateRoot(`/home?email=${this.email}&amount=${this.emailDefault.amount}`);
        }
        else {
          this.message = 'Email hoặc password không chính xác!' 
          this.showMessage = true
        }
      })  
    }    
  }

  getListAccount() {   
    this.accountService.getListAccountService().then(listAccount => {
      let mess = ''
      listAccount.forEach((acc, index) => {
        mess += `<p>${index + 1} - ${acc.email}</p>`                
      })
      this.presentAlert('Kết quả', mess)      
    }) 
  }

  addAccount() {    
    if (this.email == '' || this.password == '') {
      this.message = 'Email và password không được để trống!'    
      this.showMessage = true
    }    
    else {     
      this.checkExistsAccount('email').then(resolve => {
        if (!this.check) {      
          this.accountService.addAccount(this.email, this.password).then(resolve => {
            this.presentAlert('Kết quả', 'Thêm thành công!')
            if (this.showMessage)   
            this.message = ''  
          })  
        }  
        else {
          this.presentAlert('Kết quả', `Tài khoản ${this.email} đã có sẵn`)
        }                   
      })                                      
    }
  }

  deleteAccount() {
    if (this.email == '' || this.password == '') {
      this.message = 'Email và password không được để trống!'    
      this.showMessage = true
    }   
    else {
      this.checkExistsAccount('full').then(resolve => {
        if (this.check) {
          this.accountService.getListAccountService().then(listAccount => {
            listAccount.forEach((acc,index)=>{
              if(acc.email===this.email) listAccount.splice(index,1)
            });
            this.accountService.changeList(listAccount).then(e => {
              this.presentAlert('Kết quả', `Xóa tài khoản ${this.email} thành công!`)
            })
          })
        }
        else {
          this.presentAlert('Kết quả', `Tài khoản ${this.email} không tồn tại hoặc email, mật khẩu không chính xác!`)
        }
      })    
    }    
  }

  async checkExistsAccount(type): Promise<void> {    
    this.check = false
    switch(type) {
      case 'email':
        this.accountService.getListAccountService().then(listAccount => {
          listAccount.forEach(acc => {       
            if (this.email === acc.email) {  
              this.check = true                 
            }
          }) 
        })    
        break
      case 'full':
        this.accountService.getListAccountService().then(listAccount => {
          listAccount.forEach(acc => {       
            if (this.email === acc.email && this.password === acc.password) {  
              this.check = true                 
            }
          }) 
        })    
        break
    }    
  }
}
