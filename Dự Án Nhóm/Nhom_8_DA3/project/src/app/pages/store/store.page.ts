import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { take } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  userInput;
  products = [];

  constructor(private productService: ProductService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    const cartItems = this.productService.cart.value;
    this.productService.getProducts().pipe(take(1)).subscribe(allProducts => {
      this.products = allProducts.filter(p => cartItems[p.uid]).map(product => {
        return {...product, count: cartItems[product.uid]}
      });
    })
  }

  async checkout() {
    const alert = await this.alertCtrl.create({
      message: 'Cảm ơn bạn vì đã mua các sản phẩm của TeaTime!',
      buttons: ['Tiếp tục mua']
    });
 
    await alert.present();

    this.productService.checkoutCart();
    this.productService.loadCart();
  }

}
