import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    *{
      margin: 15px;
    }

    .btn{
      background-color: blue;
      border-radius: 10px;
      border: none;
      color: white;
      padding: 10px;
    }
  `]
})
export class DashboardComponent {

  get usuario(){
    return this.authService.usuario;
  }

  constructor( 
    private router: Router,
    private authService: AuthService
  ) { }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
