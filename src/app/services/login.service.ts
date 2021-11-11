import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
//import { Observable, throwError } from 'rxjs';
//import swal from 'sweetalert';
import { Login } from '../models/login';
//import{ catchError } from 'rxjs/operators';
import { LoginResponse } from '../models/responseLogin';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const urlEndPoint: string = 'https://gatitoz.duckdns.org/'
@Injectable({
  providedIn: 'root'
})
export class LoginService
{

  constructor(private httpClient: HttpClient/*, private router: Router*/) { }

  proveLogin(user: Login): Promise<any>
  {
    return new Promise((resolve, reject) => {
      this.httpClient.post<LoginResponse>(urlEndPoint + 'login', user, httpOptions).subscribe(response => {
        if (response.message != null) {
          reject(response.message)
        }
        if (response.idRol.id != 2) {
          reject('El usuario introducido no tiene Rol de Administrador.')
        }
        sessionStorage.setItem('id_user', response.id.toString())
        sessionStorage.setItem('role', 'ROLE_ADMIN')
        resolve('login ok')
      }, error => {
        reject('Error interno. por favor, inténtelo más tarde.')
      })
    })
    /*
    return this.httpClient.post<Login>(urlEndPoint, user, httpOptions)
                          .pipe(
                            catchError(e =>
                              {
                                  //redirijimos a la pagina de login y lanzamos el error con un alert

                                this.router.navigate(['']);

                                console.log(e.error.mensaje);

                                swal("Error al inicio de sesion", e.error.mensaje, "error");
                                return throwError(e);
                              })
                          );*/
  }

}

