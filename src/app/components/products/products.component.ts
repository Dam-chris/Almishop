import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router:Router, private productService: ProductService) { }
  allProducts = []
  shownProducts = []
  filteredProducts = []
  ngOnInit()
  {
    //## LLAMAR A PRODUCTSERVICE ##
    this.allProducts = this.productService.getAllProducts();
    this.shownProducts = this.allProducts

  }

  optionChanged(value) {
    this.shownProducts = []
    value == 'all' ? this.shownProducts = this.allProducts : this.shownProducts = this.productFilter(value)
  }

  productFilter(category) {
    this.filteredProducts = []
    for (let i = 0; i < this.allProducts.length; i++) {
      this.allProducts[i].type == category && this.filteredProducts.push(this.allProducts[i])
    }
    return this.filteredProducts
  }

  archiveProduct(idProduct: number) {
    console.log('Archived: ' + idProduct)
  }
}
