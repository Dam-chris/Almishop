import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public userData: Login = new Login()

  constructor(private router: Router, private loginService:LoginService) { }

  ngOnInit(): void
  {
    sessionStorage.setItem('role', 'ROLE_ADMIN')
    sessionStorage.getItem('role') == 'ROLE_ADMIN' && this.router.navigateByUrl('/home')
  }

  ngOnDestroy() {
    this.userData = {
      email: null,
      password: null
    }
  }

  onSubmit() {
    this.loginService.proveLogin(this.userData).then(response => {
      //console.log(response)
      //sessionStorage.setItem('role', 'ROLE_ADMIN')
      this.router.navigateByUrl('')
    }, reject => {
      swal({
        title: 'Error',
        text: reject,
        icon: 'error'
      })
    })

    /*.subscribe(res => {
      sessionStorage.setItem('role', 'ROLE_ADMIN')
      this.router.navigateByUrl('')
    }, err => {
      console.log(err)
      swal("Error", err, "error")
    })*/
  }
}
