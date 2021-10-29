import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) { }
  id: number
  product = {}
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id
    console.log(this.id)

    this.product = this.productService.getProductById(this.id)
    if (this.product == null) {
      swal("Error", "No se ha podido encotrar el producto con id: " + this.id, "error");
      this.router.navigateByUrl('products')
    }
  }

}
