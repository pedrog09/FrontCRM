import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) {
  }

  register(username:string, email:string, role:string, password:string){
    return this.http.post('http://localhost:5169/api/Usuario', 
      {
        "name": username,
        "email": email,
        "role": role,
        "password": password
      })
  }
}

