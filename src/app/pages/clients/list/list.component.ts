import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  clients: any[] = [];

  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.clientsService.getClients().subscribe({
      next: (data: any) => (this.clients = data.data),
      error: (err: any) => console.error(err),
    });
  }

  showModal = false;
  selectedClient: any = null;

  deleteClient(uuid: string) {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientsService.deleteClient(uuid).subscribe({
        next: () => {
          alert('Client deleted successfully!');
          this.fetchClients();
        },
        error: (err: any) => console.error(err),
      });
    }
  }

  openDeleteModal(client: any) {
    this.showModal = true;
    this.selectedClient = client;
  }

  closeModal() {
    this.showModal = false;
    this.selectedClient = null;
  }

  confirmDelete() {
    if (this.selectedClient) {
      this.clientsService.deleteClient(this.selectedClient.uuid).subscribe({
        next: () => {
          this.clients = this.clients.filter(
            client => client.uuid !== this.selectedClient.uuid
          );
          alert(`Client "${this.selectedClient.corporate_name}" deleted successfully.`);
          this.closeModal();
        },
        error: (err) => {
          alert('Error deleting the client. Please try again later.');
          console.error(err);
          this.closeModal();
        }
      });
    }
  }
}
