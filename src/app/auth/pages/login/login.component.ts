import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  
  miFormulario: FormGroup = this.fb.group({
    email: ['Test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService 
  ) { }

  ngOnInit(): void {
  }

  login(){
    const {email, password} = this.miFormulario.value;

    this.authService.login( email, password )
        .subscribe( ok => {

          if(ok === true){
            this.router.navigateByUrl('/dashboard');
          }else{
            const msg: string = ok;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: msg
            })
          }
        } )

  }

}
