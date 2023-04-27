import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { SearchService } from '../../core/services/search.service';
import { searchBook } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  isLoading = true;
  searchValue = '';
  allBooks: searchBook[] = [];
  constructor(
    private searchService: SearchService
  ) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];
  getSearchedBooks(value: string) {
    this.searchService.getSearchedBooks(value).subscribe((data) => {
      this.allBooks = data?.docs;
      this.searchValue = value;
      this.isLoading = false;
    });
  }
  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
      this.getSearchedBooks(value);
      });
  }
}
