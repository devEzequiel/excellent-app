import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ProductsListComponent {
  products: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data.data; // Adapte conforme a API
    });
  }

  showModal = false;
  selectedProduct: any = null; // Produto atualmente selecionado para exclusão

  // Abre a modal e define o produto a ser deletado
  openDeleteModal(product: any) {
    this.showModal = true;
    this.selectedProduct = product; // Define o produto selecionado
  }

  // Fecha a modal
  closeModal() {
    this.showModal = false;
    this.selectedProduct = null; // Reseta o produto selecionado
  }

  // Confirma e executa a exclusão via API
  confirmDelete() {
    if (this.selectedProduct) {
      // Chama o serviço para excluir o produto
      this.productsService.deleteProduct(this.selectedProduct.uuid).subscribe({
        next: () => {
          // Remove o produto da lista local após exclusão bem-sucedida
          this.products = this.products.filter(
            product => product.uuid !== this.selectedProduct.uuid
          );

          alert(`Product "${this.selectedProduct.description}" deleted successfully.`);
          this.closeModal();
        },
        error: (err) => {
          alert('Error deleting the product. Please try again later.');
          console.error(err);
          this.closeModal();
        }
      });
    }
  }
}
