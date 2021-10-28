import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert';
import { Login } from '../components/login/login';
import{ catchError } from 'rxjs/operators';


const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'}) 
};

@Injectable({
  providedIn: 'root'
})
export class LoginService 
{
  public urlEndPoint = "https://gatitoz.duckdns.org/AlmiShop/login";

  constructor(private httpClient: HttpClient, private router: Router) { }

  proveLogin(user):Observable<Login>
  {
    return this.httpClient.post<Login>(this.urlEndPoint, user, httpOptions)
                          .pipe(
                            catchError(e => 
                              {
                                /*
                                  redirijimos a la pagina de login y lanzamos el error con un alert
                                */
                                this.router.navigate(['']);

                                console.log(e.error.mensaje);
                              
                                swal("Error al inicio de sesion", e.error.mensaje, "error");
                                return throwError(e);
                              })
                          );
  }

}

