import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; 
import swal from 'sweetalert';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subject,} from 'rxjs';
import language_ES from "../../../../assets/language_ES.json";
// import * as CryptoJS from 'crypto-js';
// import * as sha1 from 'js-sha1';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { event } from 'jquery';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy
{
  dtOptions: DataTables.Settings = {};
  dtOptionsArchived: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  archivedData: any[] = [];
  
  shownProducts: any [] = [];
  
  selector: string = 'smartphone';

  constructor( private router: Router, private productService: ProductService,private modalService:NgbModal ) 
  {
    this.optionChanged( this.selector );
  }


  ngOnInit()
  {
    //## LLAMAR A PRODUCTSERVICE ##
    //this.allProducts = this.productService.getAllProducts();
   
    //this.optionChanged( this.selector );
    this.initDtOptions();

   //encriptacion, se usara mas adelante en el login...
    //let encrypt = this.encryptData('1');
    //console.log(encrypt); 
  }
  initDtOptions()
  {
    this.dtOptionsArchived = {
      pagingType: 'full_numbers',
      pageLength: 10,
      info:false,
      ordering:false,
      processing: true,
      lengthChange:true,
      language: language_ES,
      paging:false,
      searching:false,
    };
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
        { data: 'price_discounted' },
        { data: 'ver_mas'}
      ],
      destroy: true
    };
  }

  desarchive( product:any, modal:any, type:string )
  {
    console.log('estoy de desarchivar',type);
    
    product.is_archived = false;
    product.release_date = null;
    product.cover = null;
    console.log('desarchive', product);
    
    this.productService.editProduct(product)
          .then( res => 
            {
              //
            },err => console.log(err)
            );

    swal({
          title:'Producto desarchivado correctamente!',
          text:' ',
          icon:'success',
          buttons: [false],
          timer: 2000,
        });
        this.modalService.dismissAll(modal);
        this.optionChanged( type );
  }

  /*encryptData(data) 
  {

    try 
    {
      return CryptoJS.AES.encrypt(JSON.stringify(data), 'Almi123').toString();
    } catch (e) 
    {
      console.log(e);
    }
  }*/

  ngOnDestroy(): void 
  {
    this.dtTrigger.unsubscribe();
  }
  
  optionChanged(selected:string) 
  {
    console.log(selected);
    this.selector = selected;
    
      this.productService.getProductByType( selected )
      .subscribe(response => 
      {
        console.log(response);
        
        
        response.forEach(
          function (element: any) 
          {
            //let id = btoa(element.id)
            //var id = sha1(element.id);

            element.ver_mas = `<a href='products/${ element.id }/${ element.id_product_type }' >administrar...</a> `;
          }
        );

        this.dtOptions.data = response;

        this.shownProducts = response;
       
        this.dtOptions.paging = (response.length > 20) ? true: false;

        this.dtTrigger.next();

      }, error => 
      {
        console.log(error)
        if(error)
        {
          this.shownProducts = null;
        }
        /*swal({
          title: 'Error',
          text: 'No se pudieron cargar los datos',
          icon: 'error'
        })//.then(val => this.router.navigateByUrl(''))*/
      });

      //llamada aproductos archivados
      this.productService.getProductsArchived( selected )
      .subscribe((res) =>
      { 
        this.archivedData = res;
      });
  }

  /*hashCode(str) 
  {
    return str.split('').reduce((prevHash, currVal) =>
      ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
  }*/

  archivedProducts( modal: any ) 
  {
    this.modalService.open(modal,{ backdrop:'static', keyboard:false });
  }

  modalClose(modal: any)
  {
    this.modalService.dismissAll(modal);
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
