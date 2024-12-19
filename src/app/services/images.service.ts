import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private apiUrl = `${environment.apiUrl}/products/image`;

  constructor(private http: HttpClient) {}

  uploadImage(image: any): Observable<any> {
    return this.http.post(this.apiUrl, image);
  }
}
