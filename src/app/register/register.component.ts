import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../services/register/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
    ){}
  

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    })
  }    
  checkForm(){
    console.log(this.registerForm)
    if(!this.registerForm.valid){
      return 
    }
    this.submit()
  }

  submit(){
    this.registerService.register(this.registerForm.get("username")?.value, 
    this.registerForm.get("email")?.value, 
    this.registerForm.get("role")?.value, 
    this.registerForm.get("password")?.value).subscribe({
      next:()=>{alert("Sucesso");this.router.navigate(['/login'])
        .then(() => console.log('Navigation to login successful'))
        .catch(err => console.error('Navigation failed:', err));},
      error:(err)=>{console.log(err.status, err.message)},
    })
  }

}
