import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name: ['Test1', [Validators.required]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  register(){
    const {name, email, password} = this.miFormulario.value;
    this.authService.register(name, email, password)
      .subscribe( ok => {
        if(ok === true){
          this.router.navigateByUrl('/dashboard');
        }else{
          const msg:string = ok;

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg
          })
        }
      } )
  }

}
