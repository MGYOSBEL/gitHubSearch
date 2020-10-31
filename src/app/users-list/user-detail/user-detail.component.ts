import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GitHubUser } from 'src/app/models/github-user.model';

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

  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }

  close() {
    this.closeDetail.emit();
  }

}
