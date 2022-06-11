import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }
  
  public async getListAccountService(): Promise<any> {
    return JSON.parse(localStorage.getItem('listAccount'))
    // localStorage.removeItem('listAccount')
  }

  public async addAccount(email: string, password: string): Promise<void> {
    let accounts = JSON.parse(localStorage.getItem('listAccount')) || [];
    accounts.push({email: email, password: password});
    localStorage.setItem('listAccount', JSON.stringify(accounts))  
  }

  public async changeList(listAccount): Promise<void> {
    localStorage.setItem('listAccount', JSON.stringify(listAccount))  
  } 
}
