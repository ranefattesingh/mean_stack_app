import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http'
import { Observable } from 'rxjs';

interface RegisterUserResponse {
  success: boolean,
  msg: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auhToken: any;
  user: any;
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  registerUser(user:any):Observable<RegisterUserResponse> {
    this.headers.append("Content-Type", "application/json")
    return this.http.post<RegisterUserResponse>('http://localhost:8080/users/register', user, { headers: this.headers})
  }
}
