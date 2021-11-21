import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import swal from 'sweetalert';
import { Brand } from '../models/brand';
import { Color } from '../models/color';
import { Platform } from '../models/platform';
import { Genre } from '../models/genre';
import { Developer } from '../models/developer';
import { Product } from '../models/product';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  brands: Brand[] = [];
  colors: Color[] = [];
  platforms: Platform[] = [];
  genres: Genre[] = [];
  developers: Developer[] = [];

  defaultValueBrand: any = null;
  defaultValueColor: any = null;
  defaultValueDeveloper: any = null;
  defaultValueGenre: any = null;
  defaultValuePegi: any = null;
  defaultValuePlatform: any = null;

  productType:number;

  images: File[] = [];
  imageCover: string;
  product: any;

  has_sd:boolean;
  
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) 
  {
    console.log('este es el objecto que recibo en edit',this.router.getCurrentNavigation().extras.state);
    if(this.router.getCurrentNavigation().extras.state)
    {
      this.product = this.router.getCurrentNavigation().extras.state;
      this.productType = this.product.id_product_type;
      this.imageCover = this.product.cover;
      this.images = this.product.images;
      this.has_sd = (this.product.has_sd == 1)? true:false;
    }
  }


  ngOnInit(): void 
  {
    this.loadData();
    
  }
  submit( data: any )
  {
   
    data.value.cover = this.imageCover;
    data.value.images = this.images;
    
   console.log(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(this.imageCover));

   console.log(btoa(this.imageCover));
   
   
    
  }

  loadData() 
  {
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

}
