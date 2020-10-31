import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SearchService } from '../services/search.service';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchInput: ['', [Validators.required, Validators.minLength(2)]]
    }
    );

    this.searchForm.valueChanges.pipe(
      filter(value => value.searchInput.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(
      () => this.onSearch()
    );
  }

  onSearch() {
    const term = this.searchForm.value.searchInput;
    this.searchService.getUsersByName(term);
  }

}
