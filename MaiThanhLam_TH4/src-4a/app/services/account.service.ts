import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentUser: {
    id: string;
    pass: string;
    amount: number;
  } =null;
  users = [];
  constructor() {
    this.users = JSON.parse(localStorage.getItem('users'));
    if(this.users == null){this.users=[];}
  }
  addUsr(usrId: string ,usrPass: string){
    if(this.users.some((e, i) => e.id === usrId)){
      return false;
    }
    this.users.push({
      id: usrId,
      pass: usrPass
    });
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  getAll(){
    return this.users;
  }
  loginUser(usrId: string, usrPass: string){
    if(this.currentUser == null){
      this.currentUser = this.users.find(
        i =>i.id === usrId && usrPass === i.pass
        );
      return this.currentUser==null ? false: true;
    } else {
      return true;
    }
  }
  deleteUsr(usrId: string, usrPass: string){
    if(this.loginUser(usrId, usrPass)){
      this.users = this.users.filter( i => i.id !== usrId);
      localStorage.setItem('users', JSON.stringify(this.users));
      return true;
    } else {
      return false;
    }
  }
  getCurrentUser(){
    return this.currentUser;
  }
  exit(){
    this.currentUser=null;
  }
}
