import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientService } from '../services/client/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-client-management',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],

  templateUrl: './client-management.component.html',
  styleUrl: './client-management.component.css'
})
export class ClientManagementComponent {
  clients: any[] = [];
  clientForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Error loading clients:', err)
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.clientService.createClient(this.clientForm.value).subscribe({
        next: (newClient) => {
          this.clients.push(newClient);
          this.clientForm.reset();
        },
        error: (err) => console.error('Error creating client:', err)
      });
    }
  }
}
