import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SearchService } from '../services/search.service';
import { filter, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  private unsubscribe$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchFormInit();
  }

  searchFormInit() {
    this.searchForm = this.formBuilder.group({
      searchInput: ['', [Validators.required, Validators.minLength(2)]]
    }
    );
    this.setSearchConfig();
  }

  setSearchConfig() {
    this.searchForm.valueChanges.pipe(
      filter(value => value.searchInput.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(
      () => this.onSearch()
    );

  }

  onSearch() {
    const term = this.searchForm.value.searchInput;
    // this.searchService.getUsersByName(term); // cambiar por la navegacion con queryparams
    this.router.navigate(['users'], {queryParams: {q: term} });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
