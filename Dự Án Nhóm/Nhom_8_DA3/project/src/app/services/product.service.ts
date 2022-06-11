import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@capacitor/storage'
import  firebase from 'firebase/compat/app';

const CART_STORAGE_KEY = 'MY_CART';
const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cart = new BehaviorSubject({});
  productsCollection: AngularFirestoreCollection;
  cartKey = null;

  constructor(private afs: AngularFirestore) { 
    this.productsCollection = this.afs.collection('product');
    this.loadCart();
  }

  getProducts() {
    return this.productsCollection.valueChanges({idField: 'uid'});
  }

  async loadCart() {
    const result = await Storage.get({ key: CART_STORAGE_KEY });
    console.log('Cart from storage: ', result);

    if (result.value) { //Shopping cart already existed
      this.cartKey = result.value;
      this.afs.collection('carts').doc(this.cartKey).valueChanges().subscribe((result: any) => {
        delete result['lastUpdate'];
        console.log("Cart changed: ", result);
        this.cart.next(result || {});
      })
    } else {
      const fbDoc = await this.afs.collection('carts').add({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("New cart: ", fbDoc);
      this.cartKey = fbDoc.id;
      await Storage.set({ key: CART_STORAGE_KEY, value: this.cartKey });
    }
  }

  addToCart(uid) {
    this.afs.collection('carts').doc(this.cartKey).update({
      [uid]: INCREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  removeFromCart(uid) {
    this.afs.collection('carts').doc(this.cartKey).update({
      [uid]: DECREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  async checkoutCart() {
    await this.afs.collection('orders').add(this.cart.value);

    this.afs.collection('carts').doc(this.cartKey).set({
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}
