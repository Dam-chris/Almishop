import { Component, OnInit, ViewChild } from '@angular/core';
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

 defaultValueBrand: any = null;
 defaultValueColor: any = null;
 defaultValueDeveloper: any = null;
 defaultValueGenre: any = null;
 defaultValuePegi: any = null;
 defaultValuePlatform: any = null;

  constructor( private productService: ProductService, private router: Router ) { }

  ngOnInit()
  {
    this.loadData();
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
    console.log(data.value.id_color);
    
    
    if (data.untouched) 
    {
      swal({
        title: 'No pueden haber campos vacios!',
        text: 'Revise los datos y vuelva a intentarlo.',
        icon: 'info'
      });
      return;
    }
    if(data.form.status == 'INVALID')
    {
      swal({
        title: 'Error al insertar',
        text: 'Revise los datos y vuelva a intentarlo.',
        icon: 'error'
      });
     return;
    }
    switch (this.productType) 
    {
      case 'smartphone':
          this.smartphone.images = this.images;
          this.smartphone.cover = this.imageCover;
          this.smartphone.id_color = data.value.id_color;
          this.smartphone.id_brand = data.value.id_brand;
          this.productSubmited = this.smartphone;
          console.log(this.smartphone);
        break;

      case 'tablet':
          this.tablet.images = this.images;
          this.tablet.cover = this.imageCover;
          this.tablet.id_color = data.value.id_color;
          this.tablet.id_brand = data.value.id_brand;
          this.productSubmited = this.tablet;
          console.log(this.tablet);
        break;

      case 'videogame':
          this.videogame.images = this.images;
          this.videogame.cover = this.imageCover;   
          this.videogame.release_date = (this.videogame.release_date).replace(/-/g, '/');
          this.videogame.id_brand = data.value.id_brand;
          this.videogame.id_developer = data.value.id_developer;
          this.videogame.id_platform = data.value.id_platform;
          this.videogame.id_genre = data.value.id_genre;
          this.videogame.pegi = data.value.pegi;
          this.productSubmited = this.videogame;
          console.log(this.videogame);
        break;

      case 'videoconsole':
          this.videoconsole.images = this.images;
          this.videoconsole.cover = this.imageCover;
          this.videoconsole.id_brand = data.value.id_brand;
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
    //(document.getElementById(data.value) as HTMLFormElement).reset();
    
  }
  notLoading() 
  {
    console.warn('01 - Cannot load product data.')
    swal({
      title: 'Error al cargar datos',
      text: 'Por favor, inténtelo más tarde.',
      icon: 'error'
    }).then((val) => {
      this.router.navigateByUrl('products')
    })
  }

  cancel() 
  {
    swal({
      title: '¿Estás seguro?',
      text: 'Todos los campos escritos se borrarán',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) 
      {
        this.router.navigateByUrl('products')
      }
    });
  }
//para las imagenes
  onFileChange( event:any ) 
  {
    if (event.target.files && event.target.files[0]) 
    {
      
      let filesAmount = event.target.files.length;
      
      for (let i = 0; i < filesAmount; i++) 
      {
        
        let reader = new FileReader();
        
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

      let reader = new FileReader();
        
      reader.onload = (event:any) => 
      {
          
        console.log(event.target.result);
          
        this.imageCover = event.target.result;
          
      }
        
      reader.readAsDataURL(event.target.files[0]);
      
    }
  }

}
