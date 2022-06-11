import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servies/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  private currentUser: {
    id: string;
    pass: string;
    amount: number;
  };
  constructor(private loginService: LoginService, private router: Router) {
    this.currentUser = loginService.getInfo();
    if(this.currentUser == null){
      this.router.navigateByUrl('/login');
    }
  }
  ngOnInit(): void {}
  handleClick(event){
    this.router.navigateByUrl('/info');
  }
}
