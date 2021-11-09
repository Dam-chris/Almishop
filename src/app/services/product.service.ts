import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Brand } from '../models/brand';
import { Color } from '../models/color';
import { Developer } from '../models/developer';
import { Genre } from '../models/genre';
import { Platform } from '../models/platform';
import { Console } from '../models/console';
import { Smartphone } from '../models/smartphone';
import { Idk } from '../models/responseAddProd';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const urlEndPoint: string = 'https://gatitoz.duckdns.org/'

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient) { }

  getAllProducts() {
    return this.products
  }

  getProductById(id: number) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return this.products[i]
      }
    }
    return null;
  }

  async addProduct(/*brand: boolean,  brandName: any,*/ product: Smartphone | Console): Promise<any>  {

    return  new Promise((resolve, reject) => {
      console.log('he aqui el producto')
      console.log(product)
      this.httpClient.post<Idk>(urlEndPoint + 'product/add', product, httpOptions).subscribe(data => {
        if (data.message != null) {
          reject(data.message)
        }
        console.log('añadido ok')
        console.log(data)
        resolve('Producto añadido correctamente.')
      }, err => {
        console.warn('error al añadir')
        console.error(err)
        reject('No se pudo insertar los datos.')
      })

    })
    //this.httpClient.post<Object>(urlEndPoint + 'product/add', product, httpOptions)
  }

  getBrands() {
    return this.httpClient.get<Brand>(urlEndPoint + 'brand')
  }

  getColors() {
    return this.httpClient.get<Color>(urlEndPoint + 'color')
  }

  getPlatforms () {
    return this.httpClient.get<Platform>(urlEndPoint + 'platform')
  }

  getGenres() {
    return this.httpClient.get<Genre>(urlEndPoint + 'genre')
  }

  getDevelopers() {
    return this.httpClient.get<Developer>(urlEndPoint + 'developer')
  }

  addBrand(brandName: string) {
    var brandObject = {
      name: brandName
    }
    return this.httpClient.post<Brand>(urlEndPoint + 'brand/add', brandObject, httpOptions)
  }

  products = [
    {
      id: 7,
      name: 'Movil Smart phone',
      stock_sale: 369,
      stock_rent: null,
      brand: 'Marca Genérica 1',
      type: 'smartphone',
      price: 0,
      discount: 0.0,
      images: [
        {
          id_image: 0,
          name: '',
          path: ''
        },
      ],
      info: {
        id_smartphone: 1,
        storage: '256',
        ram: '6',
        inches: 4.5,
        battery: 1400,
        camera: 3.3,
        sd: true,
        color: 'Rojo'
      }
    }, {
      id: 4,
      name: 'Phone Smart X',
      stock_sale: 500,
      stock_rent: null,
      brand: 'Apole',
      type: 'smartphone',
      price: 0,
      discount: 0.0,
      images: [
        {
          id_image: 0,
          name: '',
          path: ''
        },
      ],
      info: {
        id_smartphone: 2,
        storage: '512',
        ram: '8',
        inches: 5.7,
        battery: 2600,
        camera: 14.3,
        sd: false,
        color: 'Negro'
      }
    }, {
      id: 54,
      name: 'Super Smart Movil',
      stock_sale: 250,
      stock_rent: null,
      brand: 'ChachoMi',
      type: 'smartphone',
      price: 0,
      discount: 0.0,
      images: [
        {
          id_image: 0,
          name: '',
          path: ''
        },
      ],
      info: {
        id_smartphone: 23,
        storage: '256',
        ram: '4',
        inches: 6.1,
        battery: 3200,
        camera: 1.5,
        sd: true,
        color: 'Morado'
      }
    }, {
      id: 42,
      name: 'Galaxia Z-54',
      stock_sale: 278,
      stock_rent: 15,
      brand: 'Sungmas',
      type: 'tablet',
      price: 0,
      discount: 0.0,
      images: [
        {
          id_image: 0,
          name: '',
          path: ''
        },
      ],
      info: {
        id_tablet: 1,
        storage: '256',
        ram: '6',
        inches: 4.5,
        battery: 1400,
        camera: 6.9,
        sd: true,
        color: 'Rojo'
      }
    }, {
      id: 42,
      name: 'Galaxia Z-54',
      stock_sale: 278,
      stock_rent: 15,
      brand: 'Sungmas',
      type: 'tablet',
      price: 0,
      discount: 0.0,
      images: [
        {
          id_image: 0,
          name: '',
          path: ''
        },
      ],
      info: {
        id_tablet: 1,
        storage: '1024',
        ram: '14',
        inches: 4.5,
        battery: 1400,
        camera: 6.9,
        sd: true,
        color: 'Rojo'
      }
    },
  ]
  filteredProducts = []


}

/*
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@ Templates de productos {} @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  ################
  ## SMARTPHONE ##
  ################
{
  id: 0,
  name: '',
  stock_sale: 0,
  stock_rent: null,
  brand: '',
  type: 'smartphone',
  price: 0,
  discount: 0.0,
  images: [
    {
      id_image: 0,
      name: '',
      path: ''
    },
  ],
  info: {
    id_smartphone: 0,
    storage: '',
    ram: '',
    inches: 0.0,
    battery: 0,
    camera: 0.0,
    sd: false,
    color: ''
  }
}

  ############
  ## TABLET ##
  ############
{
  id: 0,
  name: '',
  stock_sale: 0,
  stock_rent: null,
  brand: '',
  type: 'tablet',
  price: 0,
  discount: 0.0,
  images: [
    {
      id_image: 0,
      name: '',
      path: ''
    },
  ],
  info: {
    id_smartphone: 0,
    storage: '',
    ram: '',
    inches: 0.0,
    battery: 0,
    camera: 0.0,
    sd: false,
    color: ''
  }
}

  ################
  ## VIDEOJUEGO ##
  ################
{
  id: 0,
  name: '',
  stock_sale: 0,
  stock_rent: null,
  brand: '',
  type: 'videogame',
  price: 0,
  discount: 0.0,
  images: [
    {
      id_image: 0,
      name: '',
      path: ''
    },
  ],
  info: {
    id_videojuego: 0,
    realease_date: 0/0/0,
    pegi: 0,
    platform: '',
    genere: '',
    developer: ''
  }
}
  #############
  ## CONSOLA ##
  #############
{
  id: 0,
  name: '',
  stock_sale: 0,
  stock_rent: null,
  brand: '',
  type: 'console',
  price: 0,
  discount: 0.0,
  images: [
    {
      id_image: 0,
      name: '',
      path: ''
    },
  ],
  info: {
    id_console: 0,
    storage: '',
    cd: false,
    ram: '',
    cpu: '',
    gpu: ''
  }
}
*/
