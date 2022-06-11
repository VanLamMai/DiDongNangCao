import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  products: Observable<any[]>;
  @ViewChild('buyButton', { read: ElementRef}) cartBtn: ElementRef;
  cartAnimation: Animation;
  cart = {};

  constructor(private productService: ProductService, private animCtrler: AnimationController) { }

  ngAfterViewInit(): void {
    this.cartAnimation = this.animCtrler.create('cart-animation');
    this.cartAnimation
    .addElement(this.cartBtn.nativeElement)
    .keyframes([
      { offset: 0, transform: 'scale(1)' },
      { offset: 0.5, transform: 'scale(1.2)' },
      { offset: 0.8, transform: 'scale(0.9)' },
      { offset: 1, transform: 'scale(1)' }
    ])
    .duration(300)
    .easing('ease-out');
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.cart.subscribe(value => {
      this.cart = value;
    })
  }

  addToCart(event, product) {
    event.stopPropagation();
    this.productService.addToCart(product.uid);
    this.cartAnimation.play();
  }

  removeFromCart(event, product) {
    event.stopPropagation();
    this.productService.removeFromCart(product.uid);
    this.cartAnimation.play();
  }

}
