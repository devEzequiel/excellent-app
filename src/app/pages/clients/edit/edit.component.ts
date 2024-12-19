import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditClientComponent implements OnInit {
  client = { corporate_name: '', cnpj: '', email: '' };

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.clientsService.getClients().subscribe({
        next: (data) => {
          const foundClient = data.data.find((c: any) => c.uuid === clientId);
          if (foundClient) {
            this.client = foundClient;
          }
        },
        error: (err) => console.error(err),
      });
    }
  }

  update() {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.clientsService.updateClient(clientId, this.client).subscribe({
        next: () => {
          alert('Client updated successfully!');
          this.router.navigate(['/clients']); // Navega para a listagem após o sucesso
        },
        error: (err) => console.error(err),
      });
    }
  }
}
