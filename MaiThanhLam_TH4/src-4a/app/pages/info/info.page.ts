import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import {Router} from '@angular/router';

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
  constructor(private accountService: AccountService, private router: Router) {
    this.currentUser = this.accountService.getCurrentUser();
    if(this.currentUser ==null){
      this.router.navigateByUrl('/login');
    }
   }
  ngOnInit() {}
}
