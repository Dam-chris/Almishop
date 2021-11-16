import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; 
import { Language_ES } from '../../data-tables-config/language_ES'; 
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Smartphone } from '../models/smartphone';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit
{
  dtOptions: DataTables.Settings = {};
  private language_ES: Language_ES;

  constructor(private router: Router, private productService: ProductService) { }

  //allProducts = []
  shownProducts: any [] = [];
  selector: string

  async ngOnInit()
  {
    this.selector = 'smartphone'
    //## LLAMAR A PRODUCTSERVICE ##
    //this.allProducts = this.productService.getAllProducts();
    await this.optionChanged(this.selector)

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      info:false,
      ordering:false,
      processing: true,
      language:this.language_ES,
      lengthChange:true
    };

  }

  optionChanged(type: string) {
    this.productService.getProductByType(type).subscribe(response => {
      console.log(response);
      
      this.shownProducts = response
    }, error => {
      //console.log(error)
      swal({
        title: 'Error',
        text: 'No se pudieron cargar los datos',
        icon: 'error'
      })//.then(val => this.router.navigateByUrl(''))
    });

  }

  archiveProduct(idProduct: number) {
    console.log('Archived: ' + idProduct)
  }

  selectType()
  {
  
    const inputOptions = {
          smartphone: 'smartphone',
          tablet: 'tablet',
          videoconsole: 'consola',
          videogame: 'videojuego'
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
          this.router.navigate(['/products/add', {type: res}]);
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
