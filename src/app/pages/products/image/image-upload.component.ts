import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-image-upload',
  standalone: true,
  templateUrl: './product-image-upload.component.html',
  styleUrls: ['./product-image-upload.component.scss'],
})
export class ProductImageUploadComponent implements OnInit {
  uploadForm: FormGroup;
  productId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {
    // Inicializa o formulário
    this.uploadForm = this.fb.group({
      images: [null, Validators.required], // Valida que ao menos uma imagem seja enviada
    });
  }

  ngOnInit() {
    // Obtém o ID do produto pela rota
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.productId) {
      alert('No product selected.');
      this.router.navigate(['/products']); // Retorna à listagem de produtos se não houver ID
    }
  }

  /**
   * Chamado quando o input de imagens muda, associando os arquivos ao formulário.
   * @param event O evento emitido ao selecionar imagens.
   */
  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.uploadForm.patchValue({ images: files });
      this.uploadForm.get('images')?.updateValueAndValidity();
    }
  }

  /**
   * Submete os arquivos para upload à API
   */
  uploadImages() {
    if (this.uploadForm.valid) {
      // Prepara o FormData com product_id e as imagens
      const formData = new FormData();
      formData.append('product_id', this.productId);

      const images: FileList = this.uploadForm.get('images')?.value;
      for (let i = 0; i < images.length; i++) {
        formData.append('image[]', images[i]); // Adiciona cada imagem ao FormData
      }

      // Envia para a API via serviço
      this.productsService.uploadImages(formData).subscribe({
        next: () => {
          alert('Images uploaded successfully!');
          this.router.navigate(['/products']); // Volta para a listagem de produtos
        },
        error: (err) => {
          alert('Error uploading images. Please try again.');
          console.error('Upload error:', err);
        },
      });
    } else {
      alert('Please select at least one image.');
    }
  }
}
