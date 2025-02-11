import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitHubUser } from '../models/github-user.model';
import { LoadingService } from './loading.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://api.github.com';
  apiUserSearchUrl = `${this.apiUrl}/search/users`;

  constructor(
    private http: HttpClient,
    private loading: LoadingService) { }

  findUsersByName(username: string) {
    const users$ = this.http.get<any>(`${this.apiUserSearchUrl}?q=${username}&per_page=30`)
      .pipe(
        map(response => response.items)
      );
    return this.loading.showLoaderUntilCompletes(users$);
  }

  getUserByURL(url: string) {
    const user$ = this.http.get<GitHubUser>(url);
    return this.loading.showLoaderUntilCompletes(user$);
  }

  getUserRepositories(repositoriesURL: string) {
    return this.http.get<any[]>(repositoriesURL);
  }

  getUserFollowers(followersURL: string) {
    return this.http.get<any[]>(followersURL);
  }

  getUserByUsername(username: string) {
    return this.http.get<GitHubUser>(`${this.apiUrl}/users/${username}`);
  }
}
