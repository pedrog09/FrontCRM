import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form-modal.component.html',
  styleUrl: './client-form-modal.component.css'
})
export class ClientFormModalComponent {
  @Output() clientSaved = new EventEmitter<any>();
  clientForm: FormGroup;
  isEditMode = false;
  currentClient: any;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.clientForm = this.fb.group({
      usuarioId: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['client'],
      tipo: ['Pessoa', Validators.required],
      cpf: [''],
      cnpj: ['']
    });

    this.clientForm.get('tipo')?.valueChanges.subscribe(tipo => {
      if (tipo === 'Pessoa') {
        this.clientForm.get('cpf')?.setValidators([Validators.required]);
        this.clientForm.get('cnpj')?.clearValidators();
      } else {
        this.clientForm.get('cnpj')?.setValidators([Validators.required]);
        this.clientForm.get('cpf')?.clearValidators();
      }
      this.clientForm.get('cpf')?.updateValueAndValidity();
      this.clientForm.get('cnpj')?.updateValueAndValidity();
    });
  }

  initialize(client?: any): void {
    if (client) {
      this.isEditMode = true;
      this.currentClient = client;
      this.clientForm.patchValue({
        ...client,
        tipo: client.cpf ? 'Pessoa' : 'Empresa'
      });
    }
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    if (this.clientForm.invalid) return;
    
    const clientData = this.clientForm.value;
    if (this.isEditMode) {
      clientData.id = this.currentClient.id;
    }
    
    this.clientSaved.emit(clientData);
    this.activeModal.close();
  }
}
