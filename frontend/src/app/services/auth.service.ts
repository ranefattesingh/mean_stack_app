import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http'
import { Observable } from 'rxjs';

interface AuthResponse {
  success: boolean,
  msg: string,
  token: string,
  user: any;
}

interface ProfileResponse {
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auhToken: any;
  user: any;
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  registerUser(user:any) {
    this.headers.append("Content-Type", "application/json")
    return this.http.post<AuthResponse>('http://localhost:8080/users/register', user, { headers: this.headers})
  }

  authenticateUser(user:any){
    this.headers.append("Content-Type", "application/json")
    return this.http.post<AuthResponse>('http://localhost:8080/users/authenticate', user, { headers: this.headers})
  }

  getProfile(user:any){
    this.loadToken()
    this.headers.append("Content-Type", "application/json")
    this.headers.append('Authorization', this.auhToken)
    return this.http.post<AuthResponse>('http://localhost:8080/users/profile', { headers: this.headers})
  }

  storeUserData(token:string, user:any) {
    localStorage.setItem("id_token", token)
    localStorage.setItem("user", JSON.stringify(user))
    this.auhToken = token;
    this.user = user
  }

  logout() {
    this.auhToken = null
    this.user = null
    localStorage.clear()
  }


  loadToken(){
    const token = localStorage.getItem("id_token")
    this.auhToken = token
  }
}
