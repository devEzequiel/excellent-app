import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private apiUrl = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient) {}

  getClients(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createClient(client: any): Observable<any> {
    return this.http.post(this.apiUrl, client);
  }

  updateClient(uuid: string, client: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${uuid}`, client);
  }

  deleteClient(uuid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${uuid}`);
  }
}
