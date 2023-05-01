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
  isLoading = false;
  searchValue = '';
  text=" use the search to find books";
  offset = 0;
  limit = 10;
  numOfPages=0;
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
  getSearchedBooks(value: string, offset:number, limit: number) {
    if(value==""){
      this.text=" use the search to find books";
      this.allBooks=[]
      return
    }
    this.isLoading = true;
    this.searchService.getSearchedBooks(value,offset,limit).subscribe((data) => {
      this.allBooks = data?.docs;
      this.numOfPages = Math.floor(data?.numFound/limit)
      if(!this.allBooks.length){
        this.text="no results found"
      }
      this.searchValue = value;
      this.isLoading = false;
    }, (error) => {
      this.text="something went wrong. please try again later";
    }
    );
  }
  nextPage(){
    this.offset +=this.limit
    this.getSearchedBooks(this.searchValue,this.offset,this.limit);
  }
  previousPage(){
    this.offset -=this.limit
    this.getSearchedBooks(this.searchValue,this.offset,this.limit);
  }
  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
      this.getSearchedBooks(value,0,this.limit);
      });
      
  }
  
}
