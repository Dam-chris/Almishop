import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import swal from 'sweetalert';
import { NgForm } from '@angular/forms';
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
    
    swal({
      title: '¿Estás seguro de que quieres archivar este producto?',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    })
    .then((res) => {
      if (res) 
      {
        this.product.is_archived = true;
        this.product.release_date = null;
        this.product.cover = null;
        console.log(this.product);
        
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
   this.modalService.open(modal, { backdrop:'static', keyboard:false });

  }
  submitDiscount( data:NgForm )
  {
    if(data.form.status == 'INVALID')
    {
      swal({
        title: 'Error al aplicar descuento',
        text: 'Revise los datos y vuelva a intentarlo.',
        icon: 'error'
      });
     return;
    }
    let start_date: Date = new Date();    
    data.value.start_date = this.formatDate( start_date );
    data.value.end_date = this.formatDate( new Date(data.value.end_date) );

    data.value.id_product = this.product.id;

    console.log(data.value);
    
    this.productService.addDiscount( data.value )
    .subscribe( 
      res => 
      {
        if(res)
        {
          this.loadProduct();
          swal({
            title: 'Descuento Aplicado Correctamente',
            text: '',
            icon: 'success'
          });
          this.modalService.dismissAll();
        }
      },
      err => console.log(err));
    
  }

  formatDate( date: Date)
  {
    return `${ date.getFullYear() }/${ date.getMonth() }/${ date.getDay() }`
  }

}
