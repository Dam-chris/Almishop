import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isSessionStarted(): boolean {
    if (sessionStorage.getItem('rol') == '2') {
      return true;
    }
    return false;
  }

  logOut() {
    console.log('logout')
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
  }

}
