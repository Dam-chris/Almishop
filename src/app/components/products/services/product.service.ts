import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProductResponse } from '../../../models/responseAddProd';

import { Brand } from '../models/brand';
import { Smartphone } from '../models/smartphone';
import { Tablet } from '../models/tablet';
import { Videogame } from '../models/videogame';
import { Videoconsole } from '../models/videoconsole';
import { Color } from '../models/color';
import { Platform } from '../models/platform';
import { Genre } from '../models/genre';
import { Developer } from '../models/developer';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const urlEndPoint: string = 'https://gatitoz.duckdns.org'

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient, private router: Router) { }

  getProductByType(type: string):Observable<Smartphone[] | Tablet[] | Videoconsole[] | Videogame[]> 
  {
    switch (type) {
      case 'smartphone':
        return this.httpClient.get<Smartphone[]>(urlEndPoint + '/product/smartphones')
      case 'tablet':
        return this.httpClient.get<Tablet[]>(urlEndPoint + '/product/tablets')
      case 'console':
        return this.httpClient.get<Videoconsole[]>(urlEndPoint + '/product/consoles')
      case 'videogame':
        return this.httpClient.get<Videogame[]>(urlEndPoint + '/product/videogames')
      default:
        return null
    }
  }

  getProduct( id: number, id_type:number ):Observable<Smartphone | Tablet | Videogame | Videoconsole> 
  {
    switch (id_type) 
    {
      case 1:
        return this.httpClient.get<Smartphone>(urlEndPoint + `/product/smartphones/${ id }`);
      case 2:
        return this.httpClient.get<Tablet>(urlEndPoint +  `/product/tablets/${ id }`);
      case 3:
          return this.httpClient.get<Videogame>(urlEndPoint +  `/product/videogames/${ id }`);
      case 4:
        return this.httpClient.get<Videoconsole>(urlEndPoint +  `/product/consoles/${ id }`);
      default:
        return null;
    }
  }

  async addProduct(product: Smartphone | Tablet | Videoconsole | Videogame): Promise<any>  {

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

  getBrands():Observable<Brand[]>
  {
    return this.httpClient.get<Brand[]>(urlEndPoint + '/brand')
  }

  getColors():Observable<Color[]>
  {
    return this.httpClient.get<Color[]>(urlEndPoint + '/color')
  }

  getPlatforms():Observable<Platform[]> 
  {
    return this.httpClient.get<Platform[]>(urlEndPoint + '/platform')
  }

  getGenres():Observable<Genre[]>
  {
    return this.httpClient.get<Genre[]>(urlEndPoint + '/genre')
  }

  getDevelopers():Observable<Developer[]>
  {
    return this.httpClient.get<Developer[]>(urlEndPoint + '/developer')
  }

  addBrand(brandName: string):Observable<Brand> 
  {
    var brandObject:Brand = {
      id: -1,
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
