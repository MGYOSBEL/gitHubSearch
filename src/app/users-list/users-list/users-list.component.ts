import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Observable, Subject } from 'rxjs';
import { GitHubUser } from 'src/app/models/github-user.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap, tap, takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {

  users$: Observable<GitHubUser[]>;
  detail$: Observable<GitHubUser>;
  private unsubscribe$ = new Subject();
  query: string;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.users$ = this.searchService.users$;
    this.detail$ = this.searchService.userDetail$;
    this.getQueryParamsAndSearchUsers();
  }

  getQueryParamsAndSearchUsers() {
    this.route.queryParamMap.pipe(
      filter(params => !!params.get('q') && params.get('q').length > 0),
      tap(params => {
        this.query = params.get('q');
        this.searchService.getUsersByName(this.query);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  onUserDetail(user) {
    this.router.navigate(['users', user.login], {queryParams: {q: this.query}});
  }

  onCloseDetail() {
    this.searchService.closeUserDetail();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
