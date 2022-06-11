import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private accountNo: string;
  private email: string;
  private amount: number;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.accountNo = params.accountNo;
      this.email = params.email;
      this.amount = params.amount;
    });
  }

  onClick(): void {
    this.router.navigate(['/info', {
      email: this.email,
      amount: this.amount
    }]);
  }

  onPhoto(): void {
    this.router.navigateByUrl('/camera');
  }
}
