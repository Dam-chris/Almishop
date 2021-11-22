import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-see-product',
  templateUrl: './see-product.component.html',
  styleUrls: ['./see-product.component.css'],
  providers: [NgbCarouselConfig] 
})
export class SeeProductComponent implements OnInit 
  {

    product: any;
    public id: number;
    public id_type: number;
    type: string;
   /* @ViewChild('myModal') modal: ElementRef;
    @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;*/

  constructor( private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router, private modalService:NgbModal ) { }

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
         this.type = 'videojuego';
         break;
       case 4:
         this.type = 'consola';
         break;
   }

  }

  showModal( modal: any)
  {
    this.modalService.open(modal);
    
  }

  loadProduct()
  {
    if (this.id_type > 4) 
    {
      this.router.navigateByUrl("/home");  
    }
    else
    {
      this.productService.getProductById( this.id, this.id_type )
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
  //archivar productos
  archiveProduct()
  {
    console.log('archivado');
    this.product.is_archived = true;
    this.product.release_date = null;
    this.product.cover = null;
    console.log(this.product);
    
    swal({
      title: '¿Estás seguro de que quieres archivar este producto?',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    })
    .then((res) => {
      if (res) 
      {
        this.productService.editProduct(this.product);
        swal({
          title:'Producto archivado!',
          text:' ',
          icon:'success',
          buttons: [false],
          timer: 2000,
        });
        this.router.navigateByUrl('products')
      }
    });
  
  }

  //editar producto
  editProduct( product: any)
  {
    console.log(product);
    this.router.navigateByUrl('/products/edit',{ state: product });
    
  }

  addDiscount( modal:any )
  {
   this.modalService.open(modal);

  }
  submitDiscount( data:any )
  {
    //data.value.end_date = data.value.end_date.toLocaleDateString();
    data.value.start_date = new Date(Date.now());

    console.log(data.value);
    
  }

}
