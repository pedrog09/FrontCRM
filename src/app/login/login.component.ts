import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [  CommonModule,  
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ){}

  
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),

    })
  }    
  checkForm(){
    console.log(this.loginForm)
    if(!this.loginForm.valid){
      return 
    }
    this.submit()
  }

  submit(){
    const username = this.loginForm.get("username")?.value;
    const password = this.loginForm.get("password")?.value;
    
    if (!username || !password) {
      console.error('Username or password is empty');
      return;
    }

    this.loginService.login(username, password).subscribe({
      next:(token: string)=>{
        if (token) {
          this.loginService.storeToken(token);
          this.router.navigate(['/summary'])
            .then(() => console.log('Navigation to summary successful'))
            .catch(err => console.error('Navigation failed:', err));
        } else {
          console.error('No token received in response');
          alert('Erro no processo de autenticação. Tente novamente.');
        }
      },

      error:(err)=>{
        console.error('Login failed:', err);
        if (err.status === 401) {
          alert('Credenciais inválidas. Por favor, tente novamente.');
        } else {
          alert('Erro ao fazer login. Tente novamente mais tarde.');
        }
      },
    });
  }




}
