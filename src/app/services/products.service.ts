import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(uuid: string, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${uuid}`, product);
  }

  deleteProduct(uuid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${uuid}`);
  }

  uploadImages(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/image`, formData);
  }
}
