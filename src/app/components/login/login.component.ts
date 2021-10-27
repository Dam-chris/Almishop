import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string = ""
  password: string = ""

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('rol') == '2') {
      this.router.navigateByUrl('/home')
    }
  }

  onSubmit() {
    console.log(this.user, this.password)
    //  Login sin BK
    if (this.user == "a" && this.password == "a") {
      sessionStorage.setItem('rol', '2')
      this.router.navigateByUrl('')
    } else {
      swal({
        title: 'Datos inválidos',
        text: 'Inserta datos válidos.',
        icon: 'error'
      })
    }
  }

}
