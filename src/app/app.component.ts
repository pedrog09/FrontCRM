import { CommonModule } from '@angular/common';
import { Component, getModuleFactory } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontCRM';

  loginForm!:FormGroup


  constructor(
    private formBuilder: FormBuilder,
    private cleitin: LoginService
    ){}
  
  ngOnInit(){
    console.log("oi")
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.email]),
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
    this.cleitin.login(this.loginForm.get("username")?.value, this.loginForm.get("password")?.value).subscribe({
      next:(jwt:any)=>{console.log(jwt)},
      error:(err)=>{alert(err)},
      complete:()=>{},
    })
  }
}
