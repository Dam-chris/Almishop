import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Smartphone } from '../models/smartphone';
import { Tablet } from '../models/tablet';
import { Videoconsole } from '../models/videoconsole';
import { Videogame } from '../models/videogame';

@Component({
  selector: 'app-see-product',
  templateUrl: './see-product.component.html',
  styleUrls: ['./see-product.component.css']
})
export class SeeProductComponent implements OnInit 
  {

    products:Smartphone | Tablet | Videoconsole | Videogame;

  constructor(private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void 
  {
    this.activatedRoute.params.subscribe(
      params => 
      {
        let id = params['id'];
        let id_product_type = params['id_product_type'];
        
        console.log(id, id_product_type);

      });

  }

}
