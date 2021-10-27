import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() 
  {
    console.log(sessionStorage.getItem('role'));
    
   /* if (sessionStorage.getItem('role') != 'ROLE_ADMIN') 
    { 
      this.router.navigateByUrl('/login')
    }
    */
    //condicionales simples en una linea (ternary operators en  js por si te interesa)

    sessionStorage.getItem('role') != 'ROLE_ADMIN' && this.router.navigateByUrl('/login');
  }

}
