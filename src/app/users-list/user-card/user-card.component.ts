import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GitHubUser } from 'src/app/models/github-user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input()
  user: GitHubUser;

  @Output()
  detail = new EventEmitter<GitHubUser>();

  constructor() { }

  ngOnInit() {
  }

  viewUserDetail() {
    this.detail.emit(this.user);
  }

}
