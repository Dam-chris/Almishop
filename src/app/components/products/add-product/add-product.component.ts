import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; 
import swal from 'sweetalert';
import { NgForm } from '@angular/forms';
import { Smartphone } from '../models/smartphone';
import { Brand } from '../models/brand';
import { Color } from '../models/color';
import { Platform } from '../models/platform';
import { Genre } from '../models/genre';
import { Developer } from '../models/developer';
import { Product } from '../models/product';
import { Tablet } from '../models/tablet';
import { Videogame } from '../models/videogame';
import { Videoconsole } from '../models/videoconsole';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit 
{

 brands: Brand[] = [];
 colors: Color[] = [];
 platforms: Platform[] = [];
 genres: Genre[] = [];
 developers: Developer[] = [];

 product: Product = new Product();
 smartphone: Smartphone = new Smartphone();
 tablet: Tablet = new Tablet();
 videogame: Videogame = new Videogame();
 videoconsole: Videoconsole = new Videoconsole();

 //errorString: string;
 
 images: File[] = [];

 imageCover: File;

 productType: string;

 productSubmited:Smartphone | Tablet | Videoconsole | Videogame;
  


  constructor( private productService: ProductService, private router: Router, private datepipe: DatePipe ) { }

  ngOnInit(): void 
  {
    this.loadData();
    
    (document.getElementById('productForm') as HTMLFormElement).reset();
    this.productType = localStorage.getItem('productType');
    
    //this.errorString = '';
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

  submit(data:NgForm)
  {
    switch (this.productType) 
    {
      case 'smartphone':
          this.smartphone.images = this.images;
          this.smartphone.cover = this.imageCover;
          this.productSubmited = this.smartphone;
        break;

      case 'tablet':
          this.tablet.images = this.images;
          this.tablet.cover = this.imageCover;
          this.productSubmited = this.tablet;
        break;

      case 'videogame':
          this.videogame.images = this.images;
          this.videogame.cover = this.imageCover;   
          this.videogame.release_date = (this.videogame.release_date).replace(/-/g, '/');
          this.productSubmited = this.videogame;
        break;

      case 'videoconsole':
          this.videoconsole.images = this.images;
          this.videoconsole.cover = this.imageCover;
          this.productSubmited = this.videoconsole;
          console.log(this.videoconsole);
          
        break;
    }
    console.log('este es el producto qaue estoy enviando',this.productSubmited);
    
    this.productService.addProduct(this.productSubmited).then(response => {
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
    });
    
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
//para las imagenes
  onFileChange( event:any ) 
  {
    if (event.target.files && event.target.files[0]) 
    {
      
      var filesAmount = event.target.files.length;
      
      for (let i = 0; i < filesAmount; i++) 
      {
        
        var reader = new FileReader();
        
        reader.onload = (event:any) => 
        {
          
          console.log(event.target.result);
          
          this.images.push(event.target.result); 
          
        }
        
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  //imagen de portada
  onFileChangeCover( event:any ) 
  {
    if (event.target.files && event.target.files[0]) 
    {

      var reader = new FileReader();
        
      reader.onload = (event:any) => 
      {
          
        console.log(event.target.result);
          
        this.imageCover = event.target.result;
          
      }
        
      reader.readAsDataURL(event.target.files[0]);
      
    }
  }


  /*async submit(type: string) {
    console.log('tipo de submit: ' + type)
    switch (type) {

      //SMARTPHONE

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
        await this.productService.addProduct(productSmartphone).then(response => {
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

      //  TABLET

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

        await this.productService.addProduct(productTablet).then(response => {
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

      //  VIDEOGAME

    case 'videogame':
      if (this.validation(type) >= 1) {
        this.validationError()
        break
      }
      var productVideogame: Videogame

      var descriptionVideogame: string = this.descriptionInputV.toString()
      var dateVideogame: string = this.dateInputV.toString()
      var pegiVideogame: number = parseInt(this.pegiInputV)
      var platformVideogame: number = parseInt(this.platformInputV)
      var genreVideogame: number = parseInt(this.genreInputV)
      var developerVideogame: number = parseInt(this.developerInputV)
      var nameVideogame: string = this.nameInput.toString()
      var priceVideogame: number = parseFloat(this.priceInput)
      var stock_saleVideogame: number = parseInt(this.stockInput)
      var stock_rentVideogame: number = parseInt(this.stockRentalInputV)
      var brandVideogame: number = parseInt(this.brandInput)
      //Dar el formato adecuado a la fecha
      dateVideogame = dateVideogame.replace('-', '/')
      dateVideogame = dateVideogame.replace('-', '/')

      productVideogame = {
        id_product_type: 3,
        description: descriptionVideogame,
        release_date: dateVideogame,
        pegi: pegiVideogame,
        id_platform: platformVideogame,
        id_genre: genreVideogame,
        id_developer: developerVideogame,
        name: nameVideogame,
        price: priceVideogame,
        stock_sale: stock_saleVideogame,
        stock_rent: stock_rentVideogame,
        id_brand: brandVideogame,
      }

      await this.productService.addProduct(productVideogame).then(response => {
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

      //  CONSOLE

      case 'console':
        if (this.validation(type) >= 1) {
          this.validationError()
          break
        }
        var productConsole: Console

        var storageConsole: string = this.storageInputC.toString()
        var cdConsole: boolean = this.cdInputC
        var ramConsole: string = this.ramInputC.toString()
        var cpuConsole: string = this.cpuInputC.toString()
        var gpuConsole: string = this.gpuInputC.toString()
        var nameConsole: string = this.nameInput.toString()
        var priceConsole: number = parseFloat(this.priceInput)
        var stockConsole: number = parseInt(this.stockInput)
        var brandConsole: number = parseInt(this.brandInput)

        productConsole = {
          id_product_type: 4,
          storage: storageConsole,
          has_cd: cdConsole,
          ram: ramConsole,
          cpu: cpuConsole,
          gpu: gpuConsole,
          name: nameConsole,
          price: priceConsole,
          stock_sale: stockConsole,
          id_brand: brandConsole
        }

        await this.productService.addProduct(productConsole).then(response => {
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

        //  DEFAULT

      default:
        swal({
          title: 'Error',
          text: 'Ha habido un error, inténtelo más tarde',
          icon: 'error'
        })
      break
    }
  }*/

 /*validation(type: string): number {
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
  }*/

  /*optionChanged() 
  {
    //se vacian las imagenes al cambio de formualrio
    this.images = [];
    this.imageCover = null;
    //reset del formulario
    (document.getElementById('AnyForm') as HTMLFormElement).reset();
  }
*/

  
  
}
