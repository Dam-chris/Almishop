import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; 
import { Language_ES } from '../../data-tables-config/language_ES'; 
import swal from 'sweetalert';


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
}
