import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Almishop';

  constructor(private router:Router) { }

  onInit() {
    if (localStorage.getItem('rol') == "2") {this.router.navigateByUrl('/login')} 
  }
}
