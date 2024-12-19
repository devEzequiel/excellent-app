import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  updateOrder(uuid: string, order: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${uuid}`, order);
  }

  deleteOrder(uuid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${uuid}`);
  }
}
