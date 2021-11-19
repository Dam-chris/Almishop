import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-see-product',
  templateUrl: './see-product.component.html',
  styles: [`
      button 
      {
        margin-right: 15px;
        margin-bottom: 15px;
      }
      th
      {
        background-color: rgba(0, 0, 0, 0.05);
        width:30%;
        height: 40px;
      }
      td
      {
        padding-left: 2%;
      }
  `],
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

  constructor( private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router, private modalService:NgbModal, config: NgbCarouselConfig ) 
  {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

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

  // Move to previous slide
  getToPrev( data: NgbCarousel ) 
  {
    data.prev();
  }

  // Move to next slide
  goToNext( data: NgbCarousel ) 
  {
    data.next();
  }

  //archivar productos
  archiveProduct()
  {
    console.log('archivado');
    this.product.is_archived = true;
    console.log(this.product);
    
    swal({
      title: '¿Estás seguro de que quieres archivar este producto?',
      icon: 'warning',
      buttons: ['Cancelar', true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) 
      {
        this.productService.editProduct(this.product);
        swal({
          title:'Producto archivado!',
          icon:'success',
        }).then((archived) => archived && this.router.navigateByUrl('products'));
      }
    });
  
  }

  //editar producto
  editProduct()
  {
    
  }

}
