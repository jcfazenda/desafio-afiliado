import { Injectable } from '@angular/core';  

@Injectable({
  providedIn: 'root'
})
export class StorageService { 

  constructor( ) { 
  } 

  resetUser(user: any): void {
  
    const user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string); 

    localStorage.setItem('email',   'iso-parametrizador@giso.com');
    localStorage.setItem('name',    'Julio Fazenda');
    localStorage.setItem('avatar',  '');  
  } 

  setUser(user: any): void {
  
    const user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string); 

    localStorage.setItem('email',   user.email.toString());
    localStorage.setItem('name',   user.name.toString());
    localStorage.setItem('avatar', user.avatar === null ? '' : user.avatar.toString());  
  }  
 
  logoutUser(): any {
 
    localStorage.removeItem('accessDatabase');
    localStorage.removeItem('currentUser');  
    
  } 
 
}
