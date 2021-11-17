import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Smartphone } from '../models/smartphone';
import { Tablet } from '../models/tablet';
import { Videoconsole } from '../models/videoconsole';
import { Videogame } from '../models/videogame';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-see-product',
  templateUrl: './see-product.component.html',
  styleUrls: ['./see-product.component.css']
})
export class SeeProductComponent implements OnInit 
  {

    product: Smartphone | Tablet | Videoconsole | Videogame = new Smartphone() || new Tablet() || new Videoconsole() || new Videogame();
    public id: number;
    public id_type: number;

  constructor( private activatedRoute: ActivatedRoute, private productService: ProductService ) { }

  ngOnInit(): void 
  {
    this.activatedRoute.params.subscribe(
      params => 
      {
        this.id = parseInt( params['id'] );
        this.id_type = parseInt( params['id_product_type'] );     
      }
    );

   (this.id && this.id_type) ? this.loadProduct() : null; 
    
  }

  loadProduct()
  {
    this.productService.getProduct( this.id, this.id_type )
      .subscribe(
        res => 
        {
          this.product = res; 
          console.log(res)
        },
        err => console.log(err)
        ); 
  }

}
