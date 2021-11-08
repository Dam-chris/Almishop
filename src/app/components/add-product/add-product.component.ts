import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
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

  errorString: string

  nameInput: string
  brandInput: any
  priceInput: number
  stockInput: number

  storageInputC: number
  cdInputC: boolean = false
  ramInputC: number
  cpuInputC: string
  gpuInputC: string


  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.smartphoneSelected = true
    this.tabletSelected = false
    this.consoleSelected = false
    this.videogameSelected = false
    this.loadData()
    this.errorString = ''
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

  async submit(type: string) {

    var product = {}
    var idBrand: number
    switch (type) {
      case 'smartphone':

      break
      case 'tablet':

      break
      case 'console':
        if (this.validation(type) >= 1) {
          this.validationError()
          break
        }
        if (this.sh1 == 0) {
          //  crear marca y que devuelva la id
          var brandName =  this.brandInput
          await this.productService.addBrand({name: brandName}).subscribe(data => {
            idBrand = data.id
            var storage = this.storageInputC.toString()
            var ram = this.ramInputC.toString()
            var price = this.priceInput.toString()
            console.log('idbrand'+idBrand)
            product = {
              id_product_type: 4,
              storage: storage,
              has_cd: this.cdInputC,
              ram: ram,
              cpu: this.cpuInputC,
              gpu: this.gpuInputC,
              name: this.nameInput,
              price: price,
              stock_sale: this.stockInput,
              id_brand: idBrand
            }
            this.productService.addProduct(product).subscribe(data => {
              console.log(data)
              swal({
                title: 'Producto añadido',
                icon: 'success'
              })
            }, error => {
                swal({
                  title: 'Error',
                  text: error,
                  icon: 'error'
                })
            })
              }, error => {
                swal('Error', 'Error al añadir marca, ' + error, 'error')
                return null
            })
        } else {idBrand = parseInt(this.brandInput)}

        var storage = this.storageInputC.toString()
        var ram = this.ramInputC.toString()
        var price = this.priceInput.toString()
        console.log('idbrand'+idBrand)
        product = {
          id_product_type: 4,
          storage: storage,
          has_cd: this.cdInputC,
          ram: ram,
          cpu: this.cpuInputC,
          gpu: this.gpuInputC,
          name: this.nameInput,
          price: price,
          stock_sale: this.stockInput,
          id_brand: idBrand
        }
        this.productService.addProduct(product).subscribe(data => {
          console.log(data)
          swal({
            title: 'Producto añadido',
            icon: 'success'
          })
        }, error => {
            swal({
              title: 'Error',
              text: error,
              icon: 'error'
            })
        })
      break
      case 'videogame':

      break
      default:
        swal({
          title: 'Error',
          text: 'Ha habido un error, inténtelo más tarde',
          icon: 'error'
        })
      break
    }
  }

  validation(type: string): number {
    var errors = 0
    if (this.nameInput == undefined || this.brandInput == undefined || this.priceInput == undefined || this.stockInput == undefined) {
      errors++
    }

    switch (type) {
      case 'smartphone':

      break
      case 'tablet':

      break
      case 'console':
        if (this.storageInputC == undefined || this.ramInputC == undefined || this.cpuInputC == undefined || this.gpuInputC == undefined) {
          errors++
        }
      break
      case 'videogame':

      break
    }
    return errors
  }

  optionChanged(value: string) {
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

  notLoading() {
    console.warn('01 - Cannot load product data.')
    swal({
      title: 'Error al cargar datos',
      text: 'Por favor, inténtelo más tarde.',
      icon: 'error'
    }).then((val) => {
      //this.router.navigateByUrl('products')
    })
  }

  validationError() {
    swal({
      title: 'Error de datos',
      text: 'Revise los datos y vuelva a insertarlos.',
      icon: 'error'
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
}
