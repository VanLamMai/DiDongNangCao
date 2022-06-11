import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servies/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  currentUser: {
    id: string;
    pass: string;
    amount: number;
  };
  constructor(private loginService: LoginService, private router: Router) {
    this.currentUser = this.loginService.getInfo();
    if(this.currentUser ==null){
      this.router.navigateByUrl('/login');
    }
   }
  ngOnInit() {}
}
