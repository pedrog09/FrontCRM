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
    this.loginService.login(this.loginForm.get("username")?.value, this.loginForm.get("password")?.value).subscribe({
      next:(jwt:any)=>{
        console.log(jwt);
        this.router.navigate(['/summary']);
      },
      error:(err)=>{console.log(err.status, err.message)},
    })
  }

}
