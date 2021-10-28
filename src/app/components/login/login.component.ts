import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/components/login/login';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userData:Login = new Login();

  constructor(private router: Router) { }

  ngOnInit(): void
  {
    sessionStorage.getItem('role') == 'ROLE_ADMIN' && this.router.navigateByUrl('/home');
  }

  onSubmit() {
    console.log(this.userData)
    //  Login sin BK
    if (this.userData.email == "a@gmail.com" && this.userData.password == "a")
    {
      sessionStorage.setItem('role', 'ROLE_ADMIN');
      this.router.navigateByUrl('/home');
    }
    else
    {
      swal({
        title: 'Datos inválidos',
        text: 'Inserta datos válidos.',
        icon: 'error'
      })
    }
  }
}
