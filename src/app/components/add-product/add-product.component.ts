import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  smartphoneSelected: boolean
  tabletSelected: boolean
  consoleSelected: boolean
  videogameSelected: boolean

  sh1: any = 1
  sh2: any = 1
  sh3: any = 1
  sh4: any = 1
  sh5: any = 1
  sh6: any = 1

  rb1: boolean = true
  rb2: boolean = true
  rb3: boolean = true
  rb4: boolean = true
  rb5: boolean = true
  rb6: boolean = true

  brands: any = []
  colors: any = []
  platforms: any = []
  genres: any = []
  developers: any = []

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.smartphoneSelected = true
    this.tabletSelected = false
    this.consoleSelected = false
    this.videogameSelected = false
    this.loadData()

  }

  loadData() {
    //  Cargar Marcas
    this.productService.getBrands().subscribe(data => {
      this.brands = data
    }, err => {
      this.notLoading()
    })

    //  Cargar Colores
    this.productService.getColors().subscribe(data => {
      this.colors = data
    }, err => {
      this.notLoading()
    })

    //  Cargar Plataformas
    this.productService.getPlatforms().subscribe(data => {
      this.platforms = data
    }, err => {
      this.notLoading()
    })

    //  Cargar Generos
    this.productService.getGenres().subscribe(data => {
      this.genres = data
    }, err => {
      this.notLoading()
    })

    //  Cargar Devs
    this.productService.getDevelopers().subscribe(data => {
      this.developers = data
    }, err => {
      this.notLoading()
    })
  }

  notLoading() {
    console.warn('01 - Cannot load product data.')
    swal({
      title: 'Error al cargar datos',
      text: 'Por favor, inténtelo más tarde.',
      icon: 'error'
    }).then((val) => {
      this.router.navigateByUrl('products')
    })

  }

  cancel() {
    swal({
      title: '¿Estás seguro?',
      text: 'Todos los campos escritos se borrarán',
      icon: 'warning',
      buttons: ['Cancelar', true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.router.navigateByUrl('products')
      }
    });
  }

  optionChanged(value) {
    switch (value) {
      case 'smartphone':
        this.smartphoneSelected = true
        this.tabletSelected = false
        this.consoleSelected = false
        this.videogameSelected = false
      break
      case 'tablet':
        this.smartphoneSelected = false
        this.tabletSelected = true
        this.consoleSelected = false
        this.videogameSelected = false
      break
      case 'console':
        this.smartphoneSelected = false
        this.tabletSelected = false
        this.consoleSelected = true
        this.videogameSelected = false
      break
      case 'videogame':
        this.smartphoneSelected = false
        this.tabletSelected = false
        this.consoleSelected = false
        this.videogameSelected = true
      break
    }
  }
}
