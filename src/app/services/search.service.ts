import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    this.userService.findUsersByName(username)
      .subscribe(
        users => this.usersSubject.next(users)
      );
  }

  getUserByUsername(username: string) {
    return this.userService.getUserByUsername(username);
  }

  getUserRepositories(repositoriesURL: string) {
    return this.userService.getUserRepositories(repositoriesURL);
  }

  getUserFollowers(followersURL: string) {
    return this.userService.getUserFollowers(followersURL);
  }
}
