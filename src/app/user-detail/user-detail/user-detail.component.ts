import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GitHubUser } from 'src/app/models/github-user.model';
import { SearchService } from 'src/app/services/search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  user: GitHubUser;

  @Output()
  closeDetail = new EventEmitter<void>();

  repositories$: Observable<any[]>;
  followers$: Observable<GitHubUser[]>;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getUserFollowers();
    this.getUserRepositories();
  }

  getUserRepositories() {
    this.repositories$ = this.searchService.getUserRepositories(this.user.repos_url);
  }
  getUserFollowers() {
    this.followers$ = this.searchService.getUserFollowers(this.user.followers_url);
  }

  close() {
    this.closeDetail.emit();
  }

}
