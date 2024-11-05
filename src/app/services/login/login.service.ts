import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {
  }

  login(username:string, password:string){
    return this.http.post('https://localhost:7132/api/Authentication', 
      {
      "userName": username,
      "password": password
    })
  }
}
