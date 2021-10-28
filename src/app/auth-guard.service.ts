import { Injectable } from '@angular/core';
import { CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate 
{      
    constructor(private router: Router) { }      
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
    {      
       if (this.isLoggedIn()) 
       {      
           return true;      
       }      
       //ir a pagina de login si el usurio no esta autentiticado    
        this.router.navigate(['/login']);      
        return false;      
    }      
    public isLoggedIn(): boolean 
    {      
        let status = false;      
        /*if (localStorage.getItem('isLoggedIn') == "true") {      
            status = true;      
        }
        else {      
            status = false;      
        } */ 
        status = sessionStorage.getItem('role') == "ROLE_ADMIN" ? true:false;
        console.log(status);
        
        return status;      
    }    
}    