import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'gitHubSearch';
  private unsubscribe$ = new Subject<void>();

  constructor(
    private swUpdate: SwUpdate
  ) { }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(() => {
        if (confirm(('New version is available. Load New Version?'))) {
          window.location.reload();
        }
      }
      );
    }
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
