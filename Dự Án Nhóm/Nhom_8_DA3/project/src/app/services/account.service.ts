import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  currentUser: {
    email:string;
    password:string;
  } = null;

  userList = [];

  constructor() { 
    this.userList = JSON.parse(localStorage.getItem('users'));
    if(this.userList == null) {
      this.userList = [];
    }
  }

  addUser(userEmail:string, userPassword:string) {

    if(this.userList.some((e,i) => e.email === userEmail)){
      return false;
    }

    this.userList.push({
      email:userEmail,
      pass:userPassword
    });

    localStorage.setItem('users', JSON.stringify(this.userList));
    return true;
  }

  login(userEmail:string, userPassword:string){
    if(this.currentUser == null){
      this.currentUser = this.userList.find(
        i => i.email == userEmail && i.pass == userPassword
      );

      return this.currentUser == null ? false : true;
    }
    else{
      return true;
    }
  }

  removeUser(usrEmail:string, usrPass:string){
    if(this.login(usrEmail, usrPass)){
      this.userList = this.userList.filter(i => i.email !== usrEmail);
      localStorage.setItem('users', JSON.stringify(this.userList));
      return true;
    }
    else{
      return false;
    }
  }

  getAllUser(){
    return this.userList;
  }
}
