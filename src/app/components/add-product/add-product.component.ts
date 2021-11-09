  import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ProductService } from 'src/app/services/product.service';
import swal from 'sweetalert';
import { Console } from 'src/app/models/console';
import { Smartphone } from 'src/app/models/smartphone';
import { Tablet } from 'src/app/models/tablet';

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
  /*
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
*/

  brands: any = []
  colors: any = []
  platforms: any = []
  genres: any = []
  developers: any = []

  errorString: string

  // INPUTS
  nameInput: string
  brandInput: string
  priceInput: string
  stockInput: string

  //Smartphone
  storageInputS: string
  ramInputS: string
  inchesInputS: string
  batteryInputS: string
  cameraInputS: string
  sdInputS: boolean = false
  colorInputS: string
  //Tablet
  storageInputT: string
  ramInputT: string
  inchesInputT: string
  batteryInputT: string
  cameraInputT: string
  sdInputT: boolean = false
  colorInputT: string
  //Console
  storageInputC: string
  cdInputC: boolean = false
  ramInputC: string
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
      console.log('Brands Loaded')
    }, err => {
      console.warn('Brands not loading')
      this.notLoading()
    })

    //  Cargar Colores
    this.productService.getColors().subscribe(data => {
      this.colors = data
      console.log('Colors Loaded')
    }, err => {
      console.warn('Colors not loading')
      this.notLoading()
    })

    //  Cargar Plataformas
    this.productService.getPlatforms().subscribe(data => {
      this.platforms = data
      console.log('Platforms Loaded')
    }, err => {
      console.warn('Platforms not loading')
      this.notLoading()
    })

    //  Cargar Generos
    this.productService.getGenres().subscribe(data => {
      this.genres = data
      console.log('Genres Loaded')
    }, err => {
      console.warn('Genres not loading')
      this.notLoading()
    })

    //  Cargar Devs
    this.productService.getDevelopers().subscribe(data => {
      this.developers = data
      console.log('Developers Loaded')
    }, err => {
      console.warn('Developers not loading')
      this.notLoading()
    })
  }

  async submit(type: string) {
    console.log('tipo de submit: ' + type)
    switch (type) {
      case 'smartphone':
        if (this.validation(type) >= 1) {
          this.validationError()
          break
        }

        var productSmartphone: Smartphone

        var storageSmartphone: string = this.storageInputS.toString()
        var ramSmartphone: string = this.ramInputS.toString()
        var inchesSmartphone: number = parseFloat(this.inchesInputS)
        var batterySmartphone: number = parseInt(this.batteryInputS)
        var cameraSmartphone: number = parseFloat(this.cameraInputS)
        var sdSmartphone: boolean = this.sdInputS
        var colorSmartphone: number = parseInt(this.colorInputS)
        var nameSmartphone: string = this.nameInput.toString()
        var priceSmartphone: number = parseFloat(this.priceInput)
        var stock_saleSmartphone: number = parseInt(this.stockInput)
        var brandSmartphone: number = parseInt(this.brandInput)

        productSmartphone = {
          id_product_type: 1,
          storage: storageSmartphone,
          ram: ramSmartphone,
          inches: inchesSmartphone,
          battery: batterySmartphone,
          camera: cameraSmartphone,
          has_sd: sdSmartphone,
          id_color: colorSmartphone,
          name: nameSmartphone,
          price: priceSmartphone,
          stock_sale: stock_saleSmartphone,
          id_brand: brandSmartphone
        }
        await this.productService.addProduct(/*brand, brandName,*/ productSmartphone).then(response => {
          swal({
            title: 'OK',
            text: response,
            icon: 'success'
          })
          this.router.navigateByUrl('products')
        }, reject => {
          swal({
            title: 'Error',
            text: reject,
            icon: 'error'
          })
        })
      break
      case 'tablet':

        if (this.validation(type) >= 1) {
          this.validationError()
          break
        }
        var productTablet: Tablet

        var storageTablet: string = this.storageInputT.toString()
        var ramTablet: string = this.ramInputT.toString()
        var inchesTablet: number = parseFloat(this.inchesInputT)
        var batteryTablet: number = parseInt(this.batteryInputT)
        var cameraTablet: number = parseFloat(this.cameraInputT)
        var sdTablet: boolean = this.sdInputT
        var colorTablet: number = parseInt(this.colorInputT)
        var nameTablet: string = this.nameInput.toString()
        var priceTablet: number = parseFloat(this.priceInput)
        var stock_saleTablet: number = parseInt(this.stockInput)
        var brandTablet: number = parseInt(this.brandInput)

        productTablet = {
          id_product_type: 2,
          storage: storageTablet,
          ram: ramTablet,
          inches: inchesTablet,
          battery: batteryTablet,
          camera: cameraTablet,
          has_sd: sdTablet,
          id_color: colorTablet,
          name: nameTablet,
          price: priceTablet,
          stock_sale: stock_saleTablet,
          id_brand: brandTablet
        }

        await this.productService.addProduct(/*brand, brandName,*/ productTablet).then(response => {
          swal({
            title: 'OK',
            text: response,
            icon: 'success'
          })
          this.router.navigateByUrl('products')
        }, reject => {
          swal({
            title: 'Error',
            text: reject,
            icon: 'error'
          })
        })

      break
      /*
      case 'console':
        if (this.validation(type) >= 1) {
          this.validationError()
          break
        }
        //var brand: boolean = false
        //var brandName: any
        //brandName = null

        var productConsole: Console
        var storageC: string = this.storageInputC.toString()
        var ramC: string = this.ramInputC.toString()
        var priceC: number = parseFloat(this.priceInput)
        var idBrandC: number = parseInt(this.brandInput)
        productConsole = {
          id_product_type: 4,
          storage: storageC,
          has_cd: this.cdInputC,
          ram: ramC,
          cpu: this.cpuInputC,
          gpu: this.gpuInputC,
          name: this.nameInput,
          price: priceC,
          stock_sale: this.stockInput,
          id_brand: idBrandC
        }

        await this.productService.addProduct(/*brand, brandName, productConsole).then(response => {
          swal({
            title: 'OK',
            text: response,
            icon: 'success'
          })
          this.router.navigateByUrl('products')
        }, reject => {
          swal({
            title: 'Error',
            text: reject,
            icon: 'error'
          })
        })

        /*
        if (this.sh1 == 0) {
          //  crear marca y que devuelva la id
          var brandName =  this.brandInput
          await this.productService.addBrand({name: brandName}).subscribe(data => {
            idBrand = data.id
            var storage = this.storageInputC.toString()
            var ram = this.ramInputC.toString()
            var price = this.priceInput.toString()
            console.log('idbrand'+idBrand)

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
        */
      break
      case 'videogame':
        if (this.validation(type) >= 1) {
          this.validationError()
          break
        }

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
        if (this.storageInputS == undefined || this.ramInputS == undefined || this.inchesInputS == undefined || this.batteryInputS == undefined || this.cameraInputS == undefined || this.colorInputS == undefined) {
          errors++
        }
      break
      case 'tablet':
        if (this.storageInputT == undefined || this.ramInputT == undefined || this.inchesInputT == undefined || this.batteryInputT == undefined || this.cameraInputT == undefined || this.colorInputT == undefined) {
          errors++
        }
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
