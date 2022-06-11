import { Injectable } from '@angular/core';
import {user} from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUser: {
    id: string;
    pass: string;
    amount: number;
  };
  constructor() {
    this.currentUser = null;
  }
  login(userName: string =null, passInput: string =null) {
    if(this.currentUser == null){
      if((userName===user.id) && (passInput===user.pass)){
        this.currentUser = user;
        return true;
      }else {
        return false;
      }
    } return true;
  }
  getInfo(){
    return {
      ...user,
      pass: ''
    };
  }
}
