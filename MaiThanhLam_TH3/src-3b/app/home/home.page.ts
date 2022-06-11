import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentUser = {id : 'none'};

  email: string
  amount: string

  constructor(
  
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.email = params.email
        this.amount = params.amount
      }          
    })
  }

  goToInfo() {    
    this.router.navigateByUrl(`/info?email=${this.email}&amount=${this.amount}`)
  }

  
}
