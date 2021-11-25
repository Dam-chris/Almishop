import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
  saleData:any;

  constructor(private router: Router) { }


  ngOnInit(): void 
  {
    this.saleData = [
      { name: "Smartphones", value:20 },
      { name: "Tablets", value: 10 },
      { name: "Consolas", value: 5 },
      { name: "Videojuegos", value: 15 }
    ];
  }

}
