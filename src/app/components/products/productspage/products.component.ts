import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; 
import { Language_ES } from '../../data-tables-config/language_ES'; 
import swal from 'sweetalert';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit
{
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  private language_ES: Language_ES;

  constructor(private router: Router, private productService: ProductService) { }

  //allProducts = []
  shownProducts: any [] = [];
  selector: string

  ngOnInit()
  {
    this.selector = 'smartphone'
    //## LLAMAR A PRODUCTSERVICE ##
    //this.allProducts = this.productService.getAllProducts();
    this.optionChanged(this.selector)
  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      info:false,
      ordering:false,
      processing: true,
      language:this.language_ES,
      lengthChange:true,
      data: [],
      columns: [
        { data: 'name' },
        { data: 'stock_sale' },
        { data: 'price' }
      ],
      destroy: true
    };
    
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  optionChanged(type: string) 
  {
    this.productService.getProductByType(type)
      .subscribe(response => 
      {
        console.log(response);
        this.dtOptions.data = response;
        this.dtTrigger.next();

      }, error => 
      {
      //console.log(error)
        swal({
          title: 'Error',
          text: 'No se pudieron cargar los datos',
          icon: 'error'
        })//.then(val => this.router.navigateByUrl(''))
      });
  }

  archiveProduct(idProduct: number) 
  {
    console.log('Archived: ' + idProduct)
  }

  selectType()
  {
  
    const inputOptions = {
          smartphone: 'Smartphone',
          tablet: 'Tablet',
          videoconsole: 'Consola',
          videogame: 'Videojuego'
        };

    
    Swal.fire({
      title: '¿Selecciona que producto quieres crear?',
      input: 'radio',
      inputOptions: inputOptions,
      confirmButtonColor: '#0275d8',
      inputValidator:(res) => 
      { 
        console.log(res);
        if(res)
        {
          localStorage.setItem('productType', res);
          this.router.navigate(['/products/add'], { state:{ type: res } });
          Swal.close();
        }
       return 'Debes seleccionar uno!!' 
      }

    });
    
    /*   
      recibirlo
      constructor(private router: Router) {
      console.log(this.router.getCurrentNavigation().extras.state.example); // should log out 'bar'
    }
  */
    
  }
  
}
