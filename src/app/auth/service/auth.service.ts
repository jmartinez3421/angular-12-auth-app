import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/authInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  register( name: string, email:string, password:string ){
    const url: string = `${this.baseUrl}/new`;
    const body = {name, email, password};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
          if(resp.ok){
            sessionStorage.setItem('token', resp.token!);
          }
        } ),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      )
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}`;
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            sessionStorage.setItem('token', resp.token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  validarToken(): Observable<boolean>{
    const url: string = `${this.baseUrl}/renew`;
    const headers = new HttpHeaders().set('x-token', sessionStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers})
      .pipe(
        map( resp => {
          sessionStorage.setItem('token', resp.token!);
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          }
          return resp.ok;
        } ),
        catchError(err => of(false))
      )
  }

  logout(){
    sessionStorage.removeItem('token');
  }
}
