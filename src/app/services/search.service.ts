import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly apiUrl = 'https://dea3289a5b0a40419ce2b0539bd7f1ed.ent-search.us-central1.gcp.cloud.es.io';
  private readonly apiKey = 'private-sog1ibga7iah9c17hpzi9kdq';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
    const url = `${this.apiUrl}/api/as/v1/engines/products/search`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      query: query,
    };

    return this.http.post<any[]>(url, body, { headers });
  }

}
