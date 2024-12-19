import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-products-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class ProductsCreateComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.productForm = this.fb.group({
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(1)]],
    });
  }

  submitForm() {
    if (this.productForm.valid) {
      this.productsService.createProduct(this.productForm.value).subscribe(() => {
        alert('Product created successfully!');
      });
    }
  }
}
