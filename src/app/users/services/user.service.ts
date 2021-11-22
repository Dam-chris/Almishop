import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

const urlEndPoint: string = 'https://gatitoz.duckdns.org'
@Injectable({
    providedIn: 'root'
  })
export class UserService
{
    constructor(private httpClient: HttpClient/*, private router: Router*/) { }
    
    getUsers():Observable<User[]>
    {
        return this.httpClient.get<User[]>( `${ urlEndPoint }/users` );
    }
    getUsersById( id:number ):Observable<User>
    {
        return this.httpClient.get<User>( `${ urlEndPoint }/user/${ id }` );
    }


}