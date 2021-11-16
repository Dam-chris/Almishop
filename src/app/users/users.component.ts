import { Component, OnInit } from '@angular/core';
import language_ES from "../../assets/language_ES.json";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit 
{
  dtOptions: DataTables.Settings = {};

  languaje_ES:Object;
  

  constructor() 
  {
  }
  ngOnInit(): void 
  {    
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      info:false,
      ordering:false,
      language: language_ES,
      processing: true,
      lengthChange:true 
    };


  }

}
