import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { MessagesService } from '../../services/message.service';
import { take, tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  showErrors = false;

  errors$: Observable<string[]>;
  private unsubscribe$ = new Subject<void>();

  errortimer$;
  messagetimer$;
  constructor(private messagesService: MessagesService) {
    this.errortimer$ = interval(15000).pipe(
      take(1),
      tap(() => {
        this.showErrors = false;
      })
    );
  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$
      .pipe(
        tap(() => {
          this.showErrors = true;
          this.errortimer$.pipe(
            takeUntil(this.unsubscribe$)
          ).subscribe();
        })
      );
  }

  onErrorClose() {
    this.showErrors = false;
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
