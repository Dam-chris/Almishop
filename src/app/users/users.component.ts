import { Component, OnInit } from '@angular/core';
import language_ES from "../../assets/language_ES.json";
import { UserService } from './services/user.service';
import { User } from './models/user';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit 
{
  dtOptions: DataTables.Settings = {};

  languaje_ES:Object;

  users:User[] = [];


  dtTrigger: Subject<any> = new Subject<any>();
  

  constructor( private userService:UserService) 
  { 
    this.userService.getUsers()
        .subscribe( res => 
                    {
                      
                      res.forEach(
                        function (element: any) 
                        {
                          let romanianDefaultSurname: string = 'Garcia';

                          element.ver_mas = `<a href='users/${ element.id }' >mas...</a> `;
                          ( !element.surname2 ) &&  ( element.surname2 = romanianDefaultSurname );

                          element.surnames = `${ element.surname1 } ${ element.surname2 }`;
                        }
                      );
                      console.log(res);
                      this.dtOptions.data = res;
                      this.dtTrigger.next();
                       
                      this.dtOptions.paging = (res.length > 20) ? true: false;

                    },
                    err => console.log(err));
  }
  ngOnInit(): void 
  {    
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      info:false,
      ordering:false,
      language: language_ES,
      processing: true,
      lengthChange:true,
      data: [],
      columns:[
        { data:'name' },
        { data:'surnames'},
        { data:'email' },
        { data:'birthdate' },
        { data: 'ver_mas' }
      ],
      destroy: true
    };

  }
  ngOnDestroy(): void 
  {
    this.dtTrigger.unsubscribe();
  }

}
