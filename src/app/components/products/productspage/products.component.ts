import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; 
import swal from 'sweetalert';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subject } from 'rxjs';
import language_ES from "../../../../assets/language_ES.json";
import * as CryptoJS from 'crypto-js';
import * as sha1 from 'js-sha1';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit
{
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router, private productService: ProductService) { }

  //allProducts = []
  shownProducts: any [] = [];
  selector: string;


  ngOnInit()
  {
    this.selector = 'smartphone'
  
    //## LLAMAR A PRODUCTSERVICE ##
    //this.allProducts = this.productService.getAllProducts();
    this.optionChanged(this.selector)
  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      lengthMenu: [10, 20, 35],
      info:false,
      ordering:false,
      processing: true,
      lengthChange:true,
      language: language_ES,
      data: [],
      columns: [
        { data: 'name' },
        { data: 'stock_sale' },
        { data: 'price' },
        { data: 'ver_mas'}
      ],
      destroy: true
    };
   //encriptacion, se usara mas adelante en el login...
    let encrypt = this.encryptData('1');
    console.log(encrypt);


    
  }

  encryptData(data) 
  {

    try 
    {
      return CryptoJS.AES.encrypt(JSON.stringify(data), 'Almi123').toString();
    } catch (e) 
    {
      console.log(e);
    }
  }

  ngOnDestroy(): void 
  {
    this.dtTrigger.unsubscribe();
  }
  
  optionChanged(type: string) 
  {
    this.productService.getProductByType(type)
      .subscribe(response => 
      {
        console.log(response);
        
        
        response.forEach(
          function (element: any) 
          {
            //let id = btoa(element.id)
            //var id = sha1(element.id);
           

            element.ver_mas = `<a href='products/${ element.id }/${ element.id_product_type }' >mas...</a> `;
          }
        );

        this.dtOptions.data = response;
       
        this.dtOptions.paging = (response.length > 30) ? true: false;

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

  hashCode(str) 
  {
    return str.split('').reduce((prevHash, currVal) =>
      ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
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
          this.router.navigate(['/products/add']);
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
