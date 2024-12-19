import {Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {OrdersService} from '../../../services/orders.service';
import {ClientsService} from '../../../services/clients.service';
import {ProductsService} from '../../../services/products.service';

@Component({
  selector: 'app-orders-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class OrdersCreateComponent {
  orderForm: FormGroup;
  clients: any[] = [];
  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private clientsService: ClientsService,
    private productsService: ProductsService
  ) {

    this.orderForm = this.fb.group({
      client_id: ['', Validators.required],
      products: this.fb.array([], Validators.required),
    });


    this.loadClients();
    this.loadProducts();
  }

  // Getter para os FormArray de produtos
  get productControls(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }

  addProduct() {
    this.productControls.push(
      this.fb.group({
        id: ['', Validators.required], // ID do produto
        quantity: [1, [Validators.required, Validators.min(1)]], // Quantidade mínima: 1
      })
    );
  }

  removeProduct(index: number) {
    this.productControls.removeAt(index);
  }

  incrementQuantity(index: number) {
    const productGroup = this.productControls.at(index);
    const currentQuantity = productGroup.get('quantity')?.value || 1;
    productGroup.get('quantity')?.setValue(currentQuantity + 1);
  }

  decrementQuantity(index: number) {
    const productGroup = this.productControls.at(index);
    const currentQuantity = productGroup.get('quantity')?.value || 1;
    if (currentQuantity > 1) {
      productGroup.get('quantity')?.setValue(currentQuantity - 1);
    }
  }

  /**
   * Submete o formulário para criar o pedido
   */
  submitOrder() {
    if (this.orderForm.valid) {
      this.ordersService.createOrder(this.orderForm.value).subscribe({
        next: () => {
          alert('Order created successfully!');
          this.orderForm.reset();
          while (this.productControls.length) {
            this.productControls.removeAt(0);
          }
        },
        error: (err) => {
          alert('Error creating order. Please try again.');
          console.error('Error:', err);
        },
      });
    } else {
      this.orderForm.markAllAsTouched();
    }
  }

  /**
   * Carrega os clientes para a lista de seleção
   */
  private loadClients() {
    this.clientsService.getClients().subscribe((response) => {
      this.clients = response.data;
    });
  }

  /**
   * Carrega os produtos para a lista de seleção
   */
  private loadProducts() {
    this.productsService.getProducts().subscribe((response) => {
      this.products = response.data;
    });
  }
}
