import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-see-user',
  templateUrl: './see-user.component.html',
  styleUrls: ['./see-user.component.css']
})
export class SeeUserComponent implements OnInit 
{

  id_user:number;
  user:User;

  constructor( private activatedRoute: ActivatedRoute, private userService: UserService ) 
  { 
    this.activatedRoute.params.subscribe(
      params => 
      {
        this.id_user = parseInt( params['id'] );
      }
    );
  }

  ngOnInit() 
  {
    console.log(this.id_user);

    this.userService.getUsersById(this.id_user)
        .subscribe(res => 
          {
            console.log(res);
            this.user = res;
            
          });
    
  }

}
