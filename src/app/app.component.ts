import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{

  title = 'Almishop';
  
  constructor(private router:Router){}

  
  isDisabledMenu(): boolean 
  {
    let status = sessionStorage.getItem('role') == 'ROLE_ADMIN' ? false : true;
    return status;
  }
  
  settings()
  {
    console.log("ajustes!!!");
    
  }
  logOut(menu) 
  {
    console.log('logout');
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
    menu.close();
  }
}
