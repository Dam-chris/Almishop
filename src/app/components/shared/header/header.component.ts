import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  isSessionStarted(): boolean {
    let status = sessionStorage.getItem('role') == 'ROLE_ADMIN';
    return status;
  }

  logOut() {
    console.log('logOut()')
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
  }

}
