import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/components/login/login';
import { LoginService } from 'src/app/services/login.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userData:Login = new Login();

  constructor(private router: Router, private loginService:LoginService) { }

  ngOnInit(): void
  {
    sessionStorage.getItem('role') == 'ROLE_ADMIN' && this.router.navigateByUrl('/home');
  }

  onSubmit() 
  {
    sessionStorage.setItem('role', 'ROLE_ADMIN');
    this.router.navigateByUrl('/home');
    /*this.loginService.proveLogin(this.userData)
                    .subscribe(
                      res => 
                      {
                        console.log(res);
                        sessionStorage.setItem('role', 'ROLE_ADMIN');
                      },
                      err => console.log(err)
                      );*/
  }
}
