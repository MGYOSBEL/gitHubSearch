import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
import {tap} from 'rxjs/operators';
import { GitHubUser } from '../models/github-user.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private usersSubject = new BehaviorSubject<GitHubUser[]>([]);
  users$ = this.usersSubject.asObservable();

  private userDetailSubject = new BehaviorSubject<GitHubUser>(null);
  userDetail$ = this.userDetailSubject.asObservable();

  constructor(
    private userService: UserService
  ) { }

  getUsersByName(username: string) {
    this.userService.findUsersByName(username).pipe(
      tap(() => this.closeUserDetail())
    ).subscribe(
      users => this.usersSubject.next(users.items)
    );
  }

  viewUserDetail(user: GitHubUser) {
    this.userService.getUserByURL(user.url).subscribe(
      userDetail => this.userDetailSubject.next(userDetail)
    );
  }
  closeUserDetail() {
    console.log('closeUserDetail');
    this.userDetailSubject.next(null);
  }

  getUserRepositories(repositoriesURL: string) {
    return this.userService.getUserRepositories(repositoriesURL);
  }

  getUserFollowers(followersURL: string) {
    return this.userService.getUserFollowers(followersURL);
  }
}
