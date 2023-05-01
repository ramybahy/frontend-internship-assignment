import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { searchResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) {}

  getSearchedBooks(searchQuery: string, offset:number, limit: number): Observable<searchResponse> {
    return this.apiService.get(`/search.json?q=${searchQuery.toLowerCase().split(' ').join('+')}&limit=${limit}&offset=${offset}`);
  }
}
