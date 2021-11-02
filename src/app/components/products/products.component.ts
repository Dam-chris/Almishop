import { SelectorContext } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router:Router, private productService: ProductService) { }

  ngOnInit()
  {
    //console.log(sessionStorage.getItem('role'));

   /* if (sessionStorage.getItem('role') != 'ROLE_ADMIN')
    {
      this.router.navigateByUrl('/login')
    }
    */

    //condicionales simples en una linea (ternary operators en  js por si te interesa)
    //sessionStorage.getItem('role') != 'ROLE_ADMIN' && this.router.navigateByUrl('/login');


    //## LLAMAR A PRODUCTSERVICE ##
    //  this.productService.getProducts();
  }


  optionChanged(value) {
    switch (value) {
      case 'all':

      break;
      case 'smartphone':

      break;
      case 'tablet':

      break;
      case 'videogame':

      break;
      case 'console':

      break;
    }
  }
  products = [
    {
      id: 1,
      name: 'Movil 1',
      type: 'smartphone'
    }, {
      id: 2,
      name: 'Tablet 1',
      type: 'tablet'
    }, {
      id: 3,
      name: 'Consola 1',
      type: 'console'
    }, {
      id: 4,
      name: 'Videojuego 1',
      type: 'videogame'
    }, {
      id: 5,
      name: 'Movil 2',
      type: 'smartphone'
    }, {
      id: 6,
      name: 'Tablet 2',
      type: 'tablet'
    }, {
      id: 7,
      name: 'Consola 2',
      type: 'console'
    }, {
      id: 8,
      name: 'Videojuego 1',
      type: 'videogame'
    }
  ]

}
