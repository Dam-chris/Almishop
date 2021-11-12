import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { Color } from '../models/color';
import { Developer } from '../models/developer';
import { Genre } from '../models/genre';
import { Platform } from '../models/platform';
import { Console } from '../models/console';
import { Smartphone } from '../models/smartphone';
import { AddProductResponse } from '../models/responseAddProd';
import { Videogame } from '../models/videogame';
import { Tablet } from '../models/tablet';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const urlEndPoint: string = 'https://gatitoz.duckdns.org'

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient) { }

  getProductByType(type: string) {
    switch (type) {
      case 'smartphone':
        return this.httpClient.get(urlEndPoint + '/product/smartphones')
      case 'tablet':
        return this.httpClient.get(urlEndPoint + '/product/tablets')
      case 'console':
        return this.httpClient.get(urlEndPoint + '/product/consoles')
      case 'videogame':
        return this.httpClient.get(urlEndPoint + '/product/videogames')
      default:
        return null
    }
  }

  async addProduct(product: Smartphone | Tablet | Console | Videogame): Promise<any>  {

    return new Promise((resolve, reject) => {
      console.log('he aqui el producto')
      console.log(product)
      this.httpClient.post<AddProductResponse>(urlEndPoint + '/product/add', product, httpOptions).subscribe(data => {
        if (data.message != null) {
          reject(data.message)
        }
        console.log(data)
        resolve('Producto añadido correctamente.')
      }, err => {
        console.error(err)
        reject('No se pudo insertar los datos.')
      })

    })
  }

  getBrands() {
    return this.httpClient.get<Brand>(urlEndPoint + '/brand')
  }

  getColors() {
    return this.httpClient.get<Color>(urlEndPoint + '/color')
  }

  getPlatforms () {
    return this.httpClient.get<Platform>(urlEndPoint + '/platform')
  }

  getGenres() {
    return this.httpClient.get<Genre>(urlEndPoint + '/genre')
  }

  getDevelopers() {
    return this.httpClient.get<Developer>(urlEndPoint + '/developer')
  }

  addBrand(brandName: string) {
    var brandObject = {
      name: brandName
    }
    return this.httpClient.post<Brand>(urlEndPoint + '/brand/add', brandObject, httpOptions)
  }
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
