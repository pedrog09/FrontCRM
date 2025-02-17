import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../services/client/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientFormModalComponent } from '../shared/modals/client-form-modal/client-form-modal.component';





@Component({
  selector: 'app-client-management',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavigationComponent],




  templateUrl: './client-management.component.html',
  styleUrl: './client-management.component.css'
})
export class ClientManagementComponent {
  clients: any[] = [];
  clientForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private modalService: NgbModal
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

  openCreateModal(): void {
    const modalRef = this.modalService.open(ClientFormModalComponent);
    modalRef.componentInstance.initialize();
    
    modalRef.componentInstance.clientSaved.subscribe((newClient: any) => {
      this.clientService.createClient(newClient).subscribe({
        next: (createdClient) => {
          this.clients.push(createdClient);
        },
        error: (err) => console.error('Error creating client:', err)
      });
    });
  }

  openEditModal(client: any): void {
    const modalRef = this.modalService.open(ClientFormModalComponent);
    modalRef.componentInstance.initialize(client);
    
    modalRef.componentInstance.clientSaved.subscribe((updatedClient: any) => {
      this.clientService.updateClient(updatedClient).subscribe({
        next: () => {
          const index = this.clients.findIndex(c => c.id === updatedClient.id);
          if (index !== -1) {
            this.clients[index] = updatedClient;
          }
        },
        error: (err) => console.error('Error updating client:', err)
      });
    });
  }

  confirmDelete(client: any): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clientService.deleteClient(client.id).subscribe({
        next: () => {
          this.clients = this.clients.filter(c => c.id !== client.id);
        },
        error: (err) => console.error('Error deleting client:', err)
      });
    }
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
