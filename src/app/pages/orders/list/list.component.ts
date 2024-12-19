import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class OrdersListComponent implements OnInit {
  orders: any[] = []; // Lista de pedidos
  selectedOrder: any = null; // Pedido selecionado para exclusão

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.loadOrders();
  }

  /**
   * Carrega os pedidos do serviço
   */
  private loadOrders() {
    this.ordersService.getOrders().subscribe((response) => {
      this.orders = response.data; // Lê os pedidos do campo `data`
    });
  }

  /**
   * Abre a modal para confirmar exclusão
   * @param order Pedido selecionado para exclusão
   */
  openDeleteModal(order: any) {
    this.selectedOrder = order; // Define o pedido selecionado
    const deleteModal: any = document.getElementById('deleteModal');
    if (deleteModal) {
      deleteModal.style.display = 'block'; // Exibe a modal
    }
  }

  /**
   * Fecha a modal de deletar
   */
  closeModal() {
    this.selectedOrder = null;
    const deleteModal: any = document.getElementById('deleteModal');
    if (deleteModal) {
      deleteModal.style.display = 'none'; // Oculta a modal
    }
  }

  /**
   * Deleta o pedido selecionado
   */
  deleteOrder() {
    if (this.selectedOrder) {
      this.ordersService.deleteOrder(this.selectedOrder.uuid).subscribe({
        next: () => {
          this.orders = this.orders.filter(
            (order) => order.uuid !== this.selectedOrder.uuid
          );
          alert('Order deleted successfully.');
          this.closeModal(); // Fecha a modal após exclusão
        },
        error: (err) => {
          alert('Error deleting the order.');
          console.error(err);
          this.closeModal(); // Fecha, mesmo em caso de erro
        },
      });
    }
  }
}
