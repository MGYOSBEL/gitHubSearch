import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GitHubUser } from 'src/app/models/github-user.model';
import { SearchService } from 'src/app/services/search.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user$: Observable<GitHubUser>;


  query: string;
  repositories$: Observable<any[]>;
  followers$: Observable<GitHubUser[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService) {
    }

  ngOnInit() {
    this.getUserFromURLParams();
  }

  getUserFromURLParams() {
    this.user$ = this.route.paramMap.pipe(
      switchMap(params => {
        const username = params.get('username');
        return this.searchService.getUserByUsername(username);
      }),
      shareReplay(),
      tap((user) => {
        this.getUserFollowers(user.followers_url);
        this.getUserRepositories(user.repos_url);
      })
    );
    this.route.queryParamMap.subscribe(
      queryParams => this.query = queryParams.get('q')
    );
  }

  getUserRepositories(reposUrl: string) {
    this.repositories$ = this.searchService.getUserRepositories(reposUrl);
  }
  getUserFollowers(followersUrl) {
    this.followers$ = this.searchService.getUserFollowers(followersUrl);
  }

}
