import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Observable } from 'rxjs';
import { GitHubUser } from 'src/app/models/github-user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users$: Observable<GitHubUser[]>;
  detail$: Observable<GitHubUser>;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.users$ = this.searchService.users$;
    this.detail$ = this.searchService.userDetail$;
  }

  onUserDetail(user) {
    this.searchService.viewUserDetail(user);
  }

  onCloseDetail() {
    this.searchService.closeUserDetail();
  }

}
