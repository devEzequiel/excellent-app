import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ClientsService} from '../../../services/clients.service';

@Component({
  standalone: true,
  selector: 'app-create-client',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateClientComponent {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient, // Instância de HttpClient para chamadas à API
    private router: Router,
    private clientsService: ClientsService
  ) {
    // Inicializar o formulário
    this.clientForm = this.fb.group({
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)]], // Validação para o formato de CNPJ
      corporate_name: ['', Validators.required], // Campo obrigatório para razão social
      email: ['', [Validators.required, Validators.email]], // Validação para email válido
    });
  }

  /**
   * Evento blur no campo CNPJ
   */
  onCnpjBlur() {
    const cnpjControl = this.clientForm.get('cnpj'); // Obtém o campo de CNPJ

    if (cnpjControl?.valid) {
      const rawCnpj = cnpjControl.value.replace(/\D/g, ''); // Remove caracteres especiais do CNPJ

      // Chama a API pública do CNPJ
      this.http.get(`https://publica.cnpj.ws/cnpj/${rawCnpj}`).subscribe({
        next: (data: any) => {
          // Atualiza os campos do formulário com os dados da API
          this.clientForm.patchValue({
            corporate_name: data.razao_social || '', // Razão social retornada pela API
            email: data.estabelecimento?.email || '', // Email a partir do objeto `estabelecimento`
          });
        },
        error: (err) => {
          // Caso dê erro, exibe uma mensagem para o usuário
          alert('Não foi possível recuperar os dados do CNPJ. Verifique o número informado.');
          console.error('Erro na API:', err);
        },
      });
    } else if (cnpjControl?.touched && !cnpjControl.valid) {
      alert('Por favor, insira um CNPJ válido no formato: 99.999.999/9999-99.');
    }
  }

  /**
   * Salva os dados do cliente
   */
  save() {
    if (this.clientForm.valid) {
      this.clientsService.createClient(this.clientForm.value).subscribe({
        next: () => {
          alert('Client created successfully!');
          this.clientForm.reset(); // Limpa o formulário após o sucesso
        },
        error: (err) => {
          alert('Error creating client. Please try again.');
          console.error('Error:', err);
        },
      });
    } else {
      // Marca os campos como "touched" para exibir mensagens de erro de validação
      this.clientForm.markAllAsTouched();
    }
  }
}
