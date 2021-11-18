import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-see-product',
  templateUrl: './see-product.component.html',
  styleUrls: ['./see-product.component.css']
})
export class SeeProductComponent implements OnInit 
  {

    product: any;
    public id: number;
    public id_type: number;
    type: string;

  constructor( private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router ) { }

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
  
   switch(this.id_type)
   {
       case 1:
         this.type = 'smartphone';
         break;
       case 2:
         this.type = 'tablet';
         break;
       case 3:
         this.type = 'videogame';
         break;
       case 4:
         this.type = 'console';
         break;
   }

  }

  loadProduct()
  {
    if (this.id_type > 4) 
    {
      this.router.navigateByUrl("/home");  
    }
    else
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

}
