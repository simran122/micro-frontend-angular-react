import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy {
  private pathSubject = new BehaviorSubject<string>(window.location.pathname);
  public currentPath$: Observable<string> = this.pathSubject.asObservable();
  private routerSubscription?: Subscription;
  private popstateHandler?: () => void;

  constructor(private router: Router, private ngZone: NgZone) {
    this.setupRouterListener();
    this.setupPopstateListener();
  }

  get currentPath(): string {
    return this.pathSubject.value;
  }


  private setupRouterListener(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.pathSubject.next(event.url);
      });
  }

 
  private setupPopstateListener(): void {
    this.popstateHandler = () => {
      this.ngZone.run(() => {
        const currentUrl = window.location.pathname;
        this.pathSubject.next(currentUrl);
        if (this.router.url !== currentUrl) {
          this.router.navigateByUrl(currentUrl, { skipLocationChange: true });
        }
      });
    };
    window.addEventListener('popstate', this.popstateHandler);
  }

 
  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.popstateHandler) {
      window.removeEventListener('popstate', this.popstateHandler);
    }
  }
}
